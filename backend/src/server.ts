import app from "./app";
import { config } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

config({ path: __dirname + "/environments/.env" });

export let PORT: number;

export const server = createServer(app);

if (process.env.NODE_ENV == "dev") {
    const portFromENV = process.env.PORT;

    if (!portFromENV) {
        PORT = 4000;
    } else {
        PORT = Number(portFromENV);
    }
} else if (process.env.NODE_ENV == "test") {
    const portFromENV = process.env.PORT_TEST;

    if (!portFromENV) {
        PORT = 4001;
    } else {
        PORT = Number(portFromENV);
    }
} else {
    PORT = 3003;
}
export const socket_server_init = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST", "PUT", "DELETE"] },
});
socket_server_init.on("connection", (socket) => {
    console.log("✅ Socket - User Connected")

    socket.on("disconnect", () => {
        console.log("❌ Socket - User Disconnected");
    });
});

server.listen(PORT, () => {
    console.log("Listening on: " + PORT);
});
