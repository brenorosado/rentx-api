import { Router } from "express";
import { routeAdapter } from "../utils/routerAdapter";
import { auth } from "@middlewares/auth";
import { AccountsController } from "@controllersTest/AccountsController";

const accountRouter = Router();

const accountController = new AccountsController();

accountRouter.post("/", routeAdapter(accountController.create));
accountRouter.put("/", auth, routeAdapter(accountController.update));
accountRouter.get("/", auth, routeAdapter(accountController.find));
accountRouter.delete("/", auth, routeAdapter(accountController.delete));
accountRouter.post("/authenticate", routeAdapter(accountController.authenticate));

export { accountRouter };
