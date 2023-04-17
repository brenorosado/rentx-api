import { Router } from "express";
import { routeAdapter } from "../utils/routerAdapter";
import { auth } from "../middlewares/auth";
import { ImagesController } from "@controllersTest/ImagesController";

const imageRouter = Router();

const imageController = new ImagesController();

imageRouter.post("/", auth, routeAdapter(imageController.create));
imageRouter.delete("/:id", auth, routeAdapter(imageController.delete));
// imageRouter.get("/file/:fileName", routeAdapter(imageController.get));

export { imageRouter };
