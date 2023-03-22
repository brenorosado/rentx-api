import { Router } from "express";
import { routeAdapter } from "../utils/routerAdapter";
import { auth } from "../middlewares/auth";
import { CarsController } from "@controllersTest/CarsController";

const carRouter = Router();

const carsController = new CarsController();

carRouter.post("/", auth, routeAdapter(carsController.create));
carRouter.delete("/:id", auth, routeAdapter(carsController.delete));
carRouter.get("/", auth, routeAdapter(carsController.find));

export { carRouter };
