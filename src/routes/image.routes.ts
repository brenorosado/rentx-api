import { Router } from "express";
import { CreateImageController } from "../modules/Image/CreateImage/CreateImageController";
import { routeAdapter } from "../utils/routerAdapter";
import { auth } from "../middlewares/auth";

const imageRouter = Router();

const createImage = new CreateImageController();

imageRouter.post("/", auth, routeAdapter(createImage.handle));

export { imageRouter };
