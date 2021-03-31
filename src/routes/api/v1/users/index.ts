import current from "./current";
import currentScoreCard from "./currentScoreCard";
import verificationCode from "./verificationCode";
import { RouteBuilder } from "../../../utils";
import { auth } from "../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/current",
		controller: current,
		method: "get",
		middleware: [auth],
	},
	{
		route: "/current/score_card",
		controller: currentScoreCard,
		method: "get",
		middleware: [auth],
	},
	{
		route: "/verification_code",
		controller: verificationCode,
		method: "post",
		middleware: [auth],
	},
]);
