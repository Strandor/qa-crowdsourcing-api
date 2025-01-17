import { Response } from "express";
import { CurrentUserRequest } from "./interface";
/**
 * Route for getting current user
 */
export default async (req: CurrentUserRequest, res: Response) => {
	try {
		res.send(req.body.user.getPublic());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
