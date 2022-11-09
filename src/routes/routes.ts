import { Router } from "express";

import { accountRouter } from "./account.routes";
import { authenticateRouter } from "./authentication.routes";

const router = Router();

router.use("/account", accountRouter);
router.use("/authenticate", authenticateRouter);

export { router };
