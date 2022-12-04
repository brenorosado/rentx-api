import { Router } from "express";
import { CreateAccountController } from "../modules/Account/createAccount/CreateAccountController";
import { DeleteAccountController } from "../modules/Account/deleteAccount/DeleteAccountController";
import { routeAdapter } from "../utils/routerAdapter";
import { auth } from "../middlewares/auth";
import { GetAccountController } from "../modules/Account/getAccount/getAccountController";

const accountRouter = Router();

const createAccount = new CreateAccountController();
const deleteAccount = new DeleteAccountController();
const getAccount = new GetAccountController();

accountRouter.post("/", routeAdapter(createAccount.handle));
accountRouter.delete("/:id", auth, routeAdapter(deleteAccount.handle));
accountRouter.get("/", auth, routeAdapter(getAccount.handle));

export { accountRouter };
