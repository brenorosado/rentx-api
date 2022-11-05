import { Router } from "express";
import { CreateAccountController } from "../modules/Account/CreateAccount/CreateAccountController";
import { routeAdapter } from "../utils/routerAdapter";
const accountRouter = Router();

const createAccount = new CreateAccountController();

accountRouter.post("/", routeAdapter(createAccount.handle));

export { accountRouter };