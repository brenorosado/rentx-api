import express, { Application } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { router } from "./routes/routes";

const PORT = 8080;

const server: Application = express();
server.use(cors());
server.use(express.json());
server.use(router);
server.use(errorHandler);

server.listen(PORT, () => console.log(`Server running at port ${PORT}`));

export default server;