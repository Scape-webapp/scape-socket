import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(express.static("public"));
app.use(cors(options));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Scape Socket Repository");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
