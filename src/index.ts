import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import * as http from "http";
import * as socketio from "socket.io";
import { SOCKET_EVENTS } from "./utils/common";
import { onConnection } from "./controllers/message.controller";
import { connectToMongo } from "./conn";

dotenv.config();
connectToMongo();
const app: Express = express();
const httpServer = createServer(app);
const port = process.env.PORT;
// const io: socketio.Server = new socketio.Server();
// io.attach(httpServer);

const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export const io = new socketio.Server(httpServer, {
  cors: {
    credentials: true,
    origin: "*",
  },
  maxHttpBufferSize: 1e8, //* 100 MB
});

io.on(SOCKET_EVENTS.CONNECTION, onConnection);

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Scape Socket Repository");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
