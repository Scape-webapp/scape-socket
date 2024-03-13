"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http = __importStar(require("http"));
const common_1 = require("./utils/common");
const socket_controller_1 = require("./controllers/socket.controller");
const conn_1 = require("./conn");
const socket_io_1 = require("socket.io");
const auth_guard_1 = require("./middlewares/auth.guard");
dotenv_1.default.config();
(0, conn_1.connectToMongo)();
const app = (0, express_1.default)();
const httpServer = http.createServer(app);
const port = process.env.PORT;
// const io: socketio.Server = new socketio.Server();
// io.attach(httpServer);
const allowedOrigins = ["http://localhost:3000"];
const options = {
    origin: allowedOrigins,
};
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Scape Socket Repository");
});
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        credentials: true,
        origin: "*",
    },
    // maxHttpBufferSize: 1e8, //* 100 MB
});
exports.io.use(auth_guard_1.authMiddleware);
exports.io.on(common_1.SOCKET_EVENTS.CONNECTION, socket_controller_1.onConnection);
httpServer.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
