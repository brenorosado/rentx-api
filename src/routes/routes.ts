import { Router } from "express";

import { accountRouter } from "./account.routes";
import { authenticateRouter } from "./authentication.routes";
import { imageRouter } from "./image.routes";

const router = Router();

router.use("/account", accountRouter);
router.use("/authenticate", authenticateRouter);
router.use("/image", imageRouter);

export { router };
