// import dotenv from "dotenv";
const dotenv =require('dotenv');
import express, { Express, Request, Response } from "express";
import cors from "cors";
import * as http from "http";
import { SOCKET_EVENTS } from "./utils/common";
import { onConnection } from "./controllers/socket.controller";
import { connectToMongo } from "./conn";
import { Server } from "socket.io";
import { authMiddleware } from "./middlewares/auth.guard";

dotenv.config();
connectToMongo();
const app: Express = express();
const httpServer = http.createServer(app);
const port = process.env.PORT;
// const io: socketio.Server = new socketio.Server();
// io.attach(httpServer);

const allowedOrigins = ["http://localhost:3000", process.env.FRONTEND_URL as string];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(express.static("public"));
app.use(cors(options));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Scape Socket Repository");
});

export const io = new Server(httpServer, {
  cors: {
    credentials: true,
    origin: "*",
  },
  // maxHttpBufferSize: 1e8, //* 100 MB
});

io.use(authMiddleware);
io.on(SOCKET_EVENTS.CONNECTION, onConnection);

httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
