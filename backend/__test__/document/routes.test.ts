import { describe } from "node:test";
import request from "superagent";
import { config } from "dotenv";
import path from "node:path";
import { readFileSync } from "node:fs";
import { axiosInstance } from "../config/api";
import { AxiosError } from "axios";
import { requestBodyForUploadDoc } from "./helpers";

config({ path: __dirname + "/../../environments/.env" });

const PORT = process.env.PORT_TEST;
console.log(__dirname + "/../../environments/.env");
console.log("PORT TEST: ", PORT);

export const baseBackEndURL = `http://localhost:${PORT}/api`;

const basePath = "/document";
const fullBaseRouteURL = baseBackEndURL + basePath;

describe("🚧 Routes -- 📖 Document", () => {
    test("Get All Document Files", async () => {
        const { status, body } = await request(fullBaseRouteURL);

        expect(status).toBe(200);
        expect(body).toHaveProperty("files");
    });

    test("Upload new Document File (!user data included)", async () => {
        const formData = requestBodyForUploadDoc();

        try {
            const { status, data } = await axiosInstance.post(
                fullBaseRouteURL,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Response Body:", data);
            expect(status).toBe(201);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.message);
                console.log(error.response?.data);
            }
            throw error;
        }
    });

    test("Delete a Document", async () => {
        try {
            const { status } = await axiosInstance.delete(fullBaseRouteURL + "/Costume.jpg");
            expect(status).toBe(200);
        } catch (error) {
            throw error;
        }
    });
});
