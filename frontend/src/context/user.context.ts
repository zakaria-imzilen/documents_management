import { createContext } from "react";
import { IUserContext } from "../types/context/user.types";

const userContext = createContext<IUserContext | null>(null);

export default userContext;