import axios from "axios";

export const mainBaseURL = "http://localhost:5001";
export const apiBaseURL = `${mainBaseURL}/api`;

export const axiosMainInstance = axios.create({
    baseURL: apiBaseURL,
    withCredentials: true,
});

export const User_Login = async () => {
    try {
        const { status, data } = await axiosMainInstance.get("/auth/token");

        if (status !== 200 || !data.user || !data.message) {
            return Promise.reject({
                status: false,
                message: "Session Expired",
            });
        }

        return Promise.resolve({
            status: true,
            message: data.message,
            user: data.user,
        });
    } catch (error) {
        console.log(error);
        return Promise.reject({
            status: false,
            message: "Error: Something went wrong",
        });
    }
};
