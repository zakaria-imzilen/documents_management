import { NextFunction, Request, Response } from "express";

import CRUD_Resssource from "../CRUD";
import { allModelName } from "../types/models";
import {
    CustomError,
    extractStatusAndMessageFromErr,
} from "../helpers/error.helper";
import path from "path";
import { AllowedFileTypes } from "../types/models/document";
import "../models/Document";

const DocumentModel = new CRUD_Resssource(allModelName.DOCUMENT);

export const createDocumentController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("Looking for files: ", req.file, req.files);
    if (!req.file) return next(new CustomError(400, "No File provided"));

    try {
        const directory = path.dirname(req.file.path);

        const newDocumentData = {
            user: {
                ...req.body,
            },
            file: {
                full_path: directory + "/" + req.fileName,
                mimetype: AllowedFileTypes.PNG,
            },
        };
        const response = await DocumentModel.createRessource(newDocumentData);

        if (!response.status) return next(new CustomError(500, response.message));

        res.status(201).send({ message: response.message, data: response.data });
    } catch (error) {
        const { status, message } = extractStatusAndMessageFromErr(error);

        res.status(status).send({ message });
    }
};
