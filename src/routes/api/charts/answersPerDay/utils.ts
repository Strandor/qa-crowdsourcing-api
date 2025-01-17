import { Answers } from "../../../../models";

export const getAnswersPerDay = async () => {
    const results = await Answers.aggregate([
        { $match: { answeredAt: { $exists: true } } },
        {
            $project: {
                date: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$answeredAt",
                    },
                },
            },
        },
        {
            $group: {
                _id: { date: "$date" },
                count: { $sum: 1 },
            },
        },
    ]);
    return results
        .map((item) => ({
            count: item.count,
            date: new Date(Date.parse(item._id.date)),
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime());
}