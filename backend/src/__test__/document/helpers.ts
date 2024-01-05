import { readFileSync } from "fs";
import path from "path";

export const requestBodyForUploadDoc = (): FormData => {
    const testFilePath = path.join(__dirname, "/../files/Test.png");

    const file = readFileSync(testFilePath, { encoding: "binary" });
    const fileBlob = new Blob([file], { type: "image/png" }); // Adjust type as needed

    const formData = new FormData();
    formData.append("document", fileBlob, "test.png");
    formData.append("fullName", "Test User Full Name");
    formData.append("email", "test@test.com");

    return formData;
};
