import { Router } from "express";
import { routeAdapter } from "../utils/routerAdapter";
import { auth } from "../middlewares/auth";
import { CreateCarController } from "../modules/Car/createCar/CreateCarController";
import { DeleteCarController } from "../modules/Car/deleteCar/DeleteCarController";
import { GetCarsController } from "../modules/Car/getCars/GetCarsController";

const carRouter = Router();

const createCar = new CreateCarController();
const deleteCar = new DeleteCarController();
const getCars = new GetCarsController();

carRouter.post("/", auth, routeAdapter(createCar.handle));
carRouter.delete("/:id", auth, routeAdapter(deleteCar.handle));
carRouter.get("/", auth, routeAdapter(getCars.handle));

export { carRouter };
