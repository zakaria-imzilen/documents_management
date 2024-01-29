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
import { IUser } from "../models/User";
import { getDocument } from "../helpers/file.helper";

const DocumentModel = new CRUD_Resssource(allModelName.DOCUMENT);

export const createDocumentController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("Looking for file: ", req.file);
    if (!req.file) return next(new CustomError(400, "No File provided"));

    try {
        const directory = path.dirname(req.file.path);

        if (
            !Object.values(AllowedFileTypes).includes(
                req.file.mimetype as unknown as AllowedFileTypes
            )
        )
            return next(
                new CustomError(
                    400,
                    "Not allowed type file (only PNG, JPEG, WEBP, PDF)"
                )
            );

        const user = req.user as IUser;
        const newDocumentData = {
            user: user._id,
            file: {
                full_path: directory + "/" + req.fileName,
                mimetype: req.file.mimetype as AllowedFileTypes,
            },
        };

        console.log("Before creation")
        const response = await DocumentModel.createRessource(newDocumentData);
        console.log("After creation")

        if (!response.status) {
            return next(new CustomError(500, response.message));
        }
        console.log("Response: ", response)
        return res
            .status(201)
            .send({ message: response.message, data: response.data });
    } catch (error) {
        const err = extractStatusAndMessageFromErr(error);
        next(err);
    }
};

export const getUserDocuments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = req.user as IUser;

    try {
        const fetchDocuments = await DocumentModel.getRessourceWithFilter({
            user: user._id,
        });

        if (!fetchDocuments.status)
            return next(new CustomError(500, fetchDocuments.message));

        const returnedData: {
            name: string;
            mimeType: string;
            dataUrl: string;
            size: number;
            createdTime: Date;
            modifiedTime: Date;
        }[] = [];

        for (let i = 0; i < fetchDocuments.data.length; i++) {
            const doc = fetchDocuments.data[i];
            const docFound = await getDocument(doc.file.full_path);
            console.log("Doc found", docFound);
            if (docFound) {
                returnedData.push(docFound);
            }
        }

        return res.send({
            message: fetchDocuments.message,
            data: returnedData,
        });
    } catch (error) {
        const err = extractStatusAndMessageFromErr(error);
        next(err);
    }
};
