import { Router } from "express";
import { routeAdapter } from "../utils/routerAdapter";
import { AccountController } from "@controllers/AccountsController";
import { auth } from "../middlewares/auth";

const accountRouter = Router();

const accountController = new AccountController();

accountRouter.post("/", routeAdapter(accountController.create));
accountRouter.put("/", auth, routeAdapter(accountController.update));
accountRouter.get("/", auth, routeAdapter(accountController.find));
accountRouter.delete("/", auth, routeAdapter(accountController.delete));

export { accountRouter };
