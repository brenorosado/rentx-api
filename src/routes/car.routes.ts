import { Router } from "express";
import { routeAdapter } from "../utils/routerAdapter";
import { auth } from "../middlewares/auth";
import { CreateCarController } from "../modules/Car/createCar/CreateCarController";
import { DeleteCarController } from "../modules/Car/deleteCar/DeleteCarController";

const carRouter = Router();

const createCar = new CreateCarController();
const deleteCar = new DeleteCarController();

carRouter.post("/", auth, routeAdapter(createCar.handle));
carRouter.delete("/", auth, routeAdapter(deleteCar.handle));

export { carRouter };
