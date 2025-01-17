import { Response, Request } from "express";
import { Articles } from "../../../../../models";
import { ReadQueryRequest } from "./interface";

/**
 * GET articles via google query
 */
export default async (req: ReadQueryRequest, res: Response) => {
	try {
		if (!req.query.query) throw new Error("query parameter missing");
		const docs = await Articles.webSearch(req.query.query);
		res.status(200).send(docs);
	} catch (error) {
		console.log(error);
		res.status(500).send(
			error.response?.data ?? {
				message: "something unexpected went wrong in search",
			}
		);
	}
};
