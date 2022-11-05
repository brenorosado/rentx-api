import express, { Application } from "express";
import cors from "cors";

const PORT = 8080;

const server: Application = express();
server.use(cors());
server.use(express.json());

server.listen(PORT, () => console.log(`Server running at port ${PORT}`));

export default server;