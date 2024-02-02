import { readdir, unlink, readFile, stat } from "fs/promises";
import anyOtherError from "../config/logs/anyOtherError";
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

export const getDocument = async (
    fullPath: string
): Promise<{
    name: string;
    mimeType: string;
    dataUrl: string;
    size: number;
    createdTime: Date;
    modifiedTime: Date;
} | null> => {
    const fileName = path.basename(fullPath);

    try {
        const fileContent = await readFile(fullPath, "base64");
        const mimeType = lookup(fileName) || "application/octet-stream";
        const { size, birthtime, mtime } = await stat(fullPath);

        return {
            name: fileName,
            mimeType,
            dataUrl: `data:${mimeType};base64,${fileContent}`,
            size: size / (1024 * 1024),
            createdTime: birthtime,
            modifiedTime: mtime,
        };
    } catch (error) {
        console.log("Reading file error: ", error)
        return null;
    }
};
