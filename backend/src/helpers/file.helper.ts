import { readdir, unlink } from "fs/promises";
import anyOtherError from "../config/logs/anyOtherError";
import { readFile, stat } from "fs/promises";
import path from "path";
import { lookup } from "mime-types";

export const getDirectoryFiles = async (dir: string) => {
    try {
        const files = await readdir(dir, { withFileTypes: true });

        const fileList = await Promise.all(
            files.map(async (fileInfo) => {
                const fileName = fileInfo.name;
                const filePath = path.join(dir, fileName);
                const { size, birthtime, mtime } = await stat(filePath);

                if (fileInfo.isFile()) {
                    const fileContent = await readFile(filePath, "base64");
                    const mimeType = lookup(fileName) || "application/octet-stream";

                    return {
                        name: fileName,
                        mimeType, // Adjust the MIME type based on your file type
                        dataUrl: `data:${mimeType};base64,${fileContent}`,
                        size,
                        createdTime: birthtime,
                        modifiedTime: mtime,
                    };
                }

                // Handle directories or other file types if needed

                return null;
            })
        );
        console.log("Files", fileList);

        return { status: true, files: fileList };
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
            message: "Document got deleted successfuly",
        };
    } catch (error) {
        anyOtherError.error(error);
        return {
            status: false,
            error,
        };
    }
};
