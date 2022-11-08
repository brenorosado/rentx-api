import { Router } from "express";
import { CreateAccountController } from "../modules/Account/createAccount/CreateAccountController";
import { DeleteAccountController } from "../modules/Account/deleteAccount.test.ts/DeleteAccountController";
import { routeAdapter } from "../utils/routerAdapter";
const accountRouter = Router();

const createAccount = new CreateAccountController();
const deleteAccount = new DeleteAccountController();

accountRouter.post("/", routeAdapter(createAccount.handle));
accountRouter.delete("/:id", routeAdapter(deleteAccount.handle));

export { accountRouter };
