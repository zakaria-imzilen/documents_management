import { IUser } from "./user.types";

type API_login_Fail = { status: false; message: string };
type API_login_Success = { status: true; message: string, data: IUser };

export type IAPI_login = (
    email: string,
    password: string
) => Promise<API_login_Fail | API_login_Success>;
