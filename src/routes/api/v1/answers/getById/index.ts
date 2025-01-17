import { Response } from "express";
import { GetByIdRequest } from "./interface";
import * as Services from "../../../../../services";
import * as Models from "../../../../../models";
/**
 * GET answer by id
 */
export default async (req: GetByIdRequest, res: Response) => {
	try {
		// destructure answer from body
		const { answer } = req.body;

		// declare const for cache duration
		const ANSWERED_QUESTION_TTL = 86400;
		const UNANSWERED_QUESTION_TTL = 300;

		// declare cache key and cache TTL duration
		const cacheKey = `answer:${answer._id}:public`;
		const cacheTime = !!answer.answeredAt
			? ANSWERED_QUESTION_TTL
			: UNANSWERED_QUESTION_TTL;

		// get from cache or set to cache if not found
		const publicAnswer = await Services.Cache.getOrSetTTL<Models.PublicAnswer>(
			cacheKey,
			cacheTime,
			async () => {
				const publicViewOfAnswer = await answer.toPublic();
				return publicViewOfAnswer;
			}
		);

		// send response
		res.set("Cache-Control", `public, max-age=${cacheTime}`).send(publicAnswer);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
