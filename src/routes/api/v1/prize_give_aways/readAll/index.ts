import { Request, Response } from "express";
import { ReadAllRequest } from "./interface";

export default async (req: ReadAllRequest, res: Response) => {
    res.send([
        {
            time: new Date(1625158800000), // 17:00 june 30th,
            items: []
        },
        {
            time: new Date(1625763600000), // 17:00 july 7th,
            items: []
        },
        {
            time: new Date(1626368400000), // 17:00 july 15th,
            items: []
        }
    ]);
};
