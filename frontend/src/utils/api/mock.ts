import { IAPI_login } from "../../types/api_mock.types";
import { IUser } from "../../types/user.types";
import { axiosMockInstance } from "./config";

export const API_login: IAPI_login = async (email, password) => {
    email = email.trim().toLowerCase();

    try {
        const { data } = await axiosMockInstance.get("/users");
        const findUserByEmail = data.find((user: IUser) => user.email === email);

        if (!findUserByEmail)
            return Promise.reject({
                status: false,
                message: "No user with that email",
            });

        if (findUserByEmail.password !== password)
            return Promise.reject({
                status: false,
                message: "Wrong password",
            });

        return Promise.resolve({
            status: true,
            message: "Login successfuly!",
            data: data as IUser,
        });
    } catch (error) {
        return Promise.reject({
            status: false,
            message: "Hi Me",
        });
    }
};
