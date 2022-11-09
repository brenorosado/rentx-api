import { Router } from "express";
import { AuthenticateController } from "../modules/Authentication/authenticate/AuthenticateController";
import { routeAdapter } from "../utils/routerAdapter";

const authenticateRouter = Router();

const authenticate = new AuthenticateController();

authenticateRouter.post("/", routeAdapter(authenticate.handle));

export { authenticateRouter };
