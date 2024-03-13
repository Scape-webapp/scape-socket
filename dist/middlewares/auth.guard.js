"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(socket, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let access_token = ((_b = (_a = socket === null || socket === void 0 ? void 0 : socket.handshake) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.token) || "";
            if (!access_token) {
                socket.emit("error", {
                    statusCode: 401,
                    message: "Unauthorized: Token is missing",
                });
                socket.disconnect(true);
                next(new Error("Disconnected"));
                return;
            }
            const validatedToken = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_SECRET);
            if (!validatedToken) {
                socket.emit("error", {
                    statusCode: 401,
                    message: "Unauthorized: Token is invalid",
                });
                socket.disconnect(true);
                next(new Error("Disconnected"));
                return;
            }
            socket.payload = validatedToken.payload;
            next();
        }
        catch (error) {
            socket.emit("error", (error === null || error === void 0 ? void 0 : error.message) || error);
            socket.disconnect(true);
            console.log("error->", error.message);
        }
    });
}
exports.authMiddleware = authMiddleware;
