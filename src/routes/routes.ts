import { Router } from "express";

import { accountRouter } from "./account.routes";
import { imageRouter } from "./image.routes";
import { carRouter } from "./car.routes";

const router = Router();

router.use("/account", accountRouter);
router.use("/image", imageRouter);
router.use("/car", carRouter);

export { router };
