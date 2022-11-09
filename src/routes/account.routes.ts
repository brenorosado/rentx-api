import { Router } from "express";
import { CreateAccountController } from "../modules/Account/createAccount/CreateAccountController";
import { DeleteAccountController } from "../modules/Account/deleteAccount.test.ts/DeleteAccountController";
import { routeAdapter } from "../utils/routerAdapter";
import { auth } from "../middlewares/auth";

const accountRouter = Router();

const createAccount = new CreateAccountController();
const deleteAccount = new DeleteAccountController();

accountRouter.post("/", routeAdapter(createAccount.handle));
accountRouter.delete("/:id", auth, routeAdapter(deleteAccount.handle));

export { accountRouter };
