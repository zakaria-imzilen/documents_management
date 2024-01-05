import { readdir, unlink } from "fs/promises";
import anyOtherError from "../config/logs/anyOtherError";
import { readFileSync } from "fs";

export const getDirectoryFiles = async (dir: string) => {
    try {
        const files = await readdir(dir);

        const returnedFiles = [];
        for await (const file of files) {
            const fileReading = readFileSync(dir + "/" + file)
            returnedFiles.push(fileReading)
        }
        console.log("Files", returnedFiles)

        return { status: true, files: returnedFiles };
    } catch (error) {
        anyOtherError.error(error);
        return {
            status: false,
            error,
        };
    }
};

export const unlinkDocument = async (dir: string, documentPath: string) => {
    try {
        const fullPath = `${dir}/${documentPath}`;

        await unlink(fullPath);
        return {
            status: true,
            message: "Document got deleted successfuly"
        }
    } catch (error) {
        anyOtherError.error(error);
        return {
            status: false,
            error
        }
    }
}