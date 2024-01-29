import { Socket } from "socket.io-client";

export interface ISocketContext {
    isSocketConnected: boolean,
    socketIO: Socket,
}