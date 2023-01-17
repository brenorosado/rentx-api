import { Response, Router } from "express";
import { CreateImageController } from "../modules/Image/createImage/CreateImageController";
import { routeAdapter } from "../utils/routerAdapter";
import { auth } from "../middlewares/auth";
import { DeleteImageController } from "../modules/Image/deleteImage/DeleteImageController";
import { GetImageFileController } from "../modules/Image/getImageFile/GetImageFileController";

const imageRouter = Router();

const createImage = new CreateImageController();
const deleteImage = new DeleteImageController();
const getImageFile = new GetImageFileController();

imageRouter.post("/", auth, routeAdapter(createImage.handle));
imageRouter.delete("/:id", auth, routeAdapter(deleteImage.handle));
imageRouter.get("/file/:fileName", routeAdapter(getImageFile.handle));

export { imageRouter };
