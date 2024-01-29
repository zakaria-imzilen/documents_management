import { createContext } from "react";
import { ISocketContext } from "../types/context/socket.types";

const socketContext = createContext<ISocketContext | null>(null);

export default socketContext;