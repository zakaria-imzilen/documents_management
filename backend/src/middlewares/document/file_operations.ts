import { NextFunction, Request, Response } from "express";
import file_upload from "../../config/file_upload";
import { extractStatusAndMessageFromErr } from "../../helpers/error.helper";

export const uploadDocument = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const uploading = file_upload.single("document");
    uploading(req, res, (err) => {
        if (err) return next(extractStatusAndMessageFromErr(err));
        next();
    });
};
