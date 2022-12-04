import { Router } from "express";
import { CreateImageController } from "../modules/Image/createImage/CreateImageController";
import { routeAdapter } from "../utils/routerAdapter";
import { auth } from "../middlewares/auth";
import { DeleteImageController } from "../modules/Image/deleteImage/DeleteImageController";

const imageRouter = Router();

const createImage = new CreateImageController();
const deleteImage = new DeleteImageController();

imageRouter.post("/", auth, routeAdapter(createImage.handle));
imageRouter.delete("/:id", auth, routeAdapter(deleteImage.handle));

export { imageRouter };
