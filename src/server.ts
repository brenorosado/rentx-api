import express, { Application } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { router } from "./routes/routes";
import swaggerDocument from "../swagger.json";

import swaggerUi from "swagger-ui-express";

const PORT = 8080;

const server: Application = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(router);

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => console.log(`Server running at port ${PORT}`));
}

export default server;
