import jwt from "jsonwebtoken";

export async function authMiddleware(socket: any, next: any) {
  try {
    let access_token = socket?.handshake?.auth?.token || "";
    if (!access_token) {
      socket.emit("error", {
        statusCode: 401,
        message: "Unauthorized: Token is missing",
      });
      socket.disconnect(true);
      next(new Error("Disconnected"));
      return;
    }

    const validatedToken: any = jwt.verify(
      access_token,
      process.env.ACCESS_SECRET as string
    );

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
  } catch (error: any) {
    socket.emit("error", error?.message || error);
    socket.disconnect(true);
    console.log("error->", error.message);
  }
}
