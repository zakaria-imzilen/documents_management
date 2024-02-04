import { AxiosError } from "axios";
import { axiosInstance } from "../config/api";
import { baseBackEndURL } from "../document/routes.test";

const basePath = "/auth";
const fullBaseRouteURL = baseBackEndURL + basePath;

const mockUserData = {
    email: "zakaria@mock.gmail.com",
    password: "lVF0k]]|3$8ct",
    firstName: "Zakaria",
    lastName: "Imzilen",
};

describe("🥷🏻 Auth - Testing", () => {
    console.log("Currently Testing")
    test("👋🏻 Register", async () => {
        try {
            console.log("Register Testing")

            const { status, data } = await axiosInstance.post(
                fullBaseRouteURL + "/register",
                mockUserData
            );

            console.log("Register Data: ", data);
            expect(status).toBe(200);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.message);
                console.log(error.response?.data);
            }
            throw error;
        }
    });

    test("⚔ Local Login", async () => {
        try {
            const { status, data } = await axiosInstance.post(
                fullBaseRouteURL + "/login",
                {
                    email: mockUserData.email,
                    password: mockUserData.password,
                }
            );

            console.log("Login data: ", data);
            expect(status).toBe(200);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.message);
                console.log(error.response?.data);
            }
            throw error;
        }
    });

});
