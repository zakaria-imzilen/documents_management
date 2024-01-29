import { NextFunction, Request, Response } from "express";
import file_upload from "../../config/file_upload";
import {
    CustomError,
} from "../../helpers/error.helper";
import path from "path";
import { getDirectoryFiles, unlinkDocument } from "../../helpers/file.helper";

const uploadDirectoryPath = path.join(
    __dirname,
    "../../../../../documents_management_upload"
);

export const uploadDocument = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const uploading = file_upload.single("document");
    uploading(req, res, next);
};

export const getAllDocuments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const files = await getDirectoryFiles(uploadDirectoryPath);
    if (!files.status)
        next(
            new CustomError(
                500,
                "Server's error: Couldn't read files from the upload directory"
            )
        );

    res.send({ files: files.files });
};

export const deleteDocument = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { path } = req.params;

    const deleting = await unlinkDocument(uploadDirectoryPath, path);

    if (!deleting)
        return next(new CustomError(500, "Server Error: Couldn't delete the file"));

    res.send({ message: deleting.message });
};
