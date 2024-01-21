import { Dispatch, SetStateAction } from "react";
import { IUserStateConn, IUserStateNotConn } from "../user.types";

export interface IUserContext {
    userState: IUserStateConn | IUserStateNotConn,
    setUserState: Dispatch<SetStateAction<IUserStateConn | IUserStateNotConn>>
}; 
