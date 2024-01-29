import { axiosMainInstance } from ".";
import { IAPI_login } from "../../types/api_mock.types";
import { IUser } from "../../types/user.types";

export const API_login: IAPI_login = async (email, password) => {
    email = email.trim().toLowerCase();

    try {
        const { data } = await axiosMainInstance.post("/auth/login", {
            email,
            password,
        });

        return Promise.resolve({
            status: true,
            message: "Logged in successfuly!",
            data: data as IUser,
        });
    } catch (error) {
        return Promise.reject({
            status: false,
            message: "Error",
        });
    }
};
