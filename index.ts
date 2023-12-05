import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import * as http from "http";
import * as socketio from "socket.io";

dotenv.config();
const app: Express = express();
const httpServer = createServer(app);
const port = process.env.PORT;
const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server();
io.attach(server);

const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

io.on("connection", (socket: socketio.Socket) => {
  console.log("connection");
  socket.emit("status", "Hello from Socket.io");

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

app.use(express.static("public"));
app.use(cors(options));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Scape Socket Repository");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
