import { io } from "socket.io-client"
import { mainBaseURL } from "./api";

const socketIO = io(mainBaseURL);

export default socketIO;