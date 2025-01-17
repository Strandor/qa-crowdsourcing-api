import { Response, Request } from "express";
import { ArticleSources } from "../../../../../models";
/**
 * POST article_source
 */
export default async (req: Request, res: Response) => {
	try {
		const doc = await ArticleSources.create(req.body);
		res.status(201).send(doc);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
