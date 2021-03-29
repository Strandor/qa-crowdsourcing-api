import { RouteBuilder } from "../utils";
import v1 from "./v1";
import auth from "./auth";
import charts from "./charts";

export default RouteBuilder.joinRouters([
	{
		route: "/auth/",
		controller: auth,
	},
	{
		route: "/v1/",
		controller: v1,
	},
	{
		route: "/charts/",
		controller: charts,
	},
]);
