import { NextFunction, Request, Response } from "express";

import CRUD_Resssource from "../CRUD";
import { allModelName } from "../types/models";
import {
  CustomError,
  extractStatusAndMessageFromErr,
} from "../helpers/error.helper";
import path from "path";
import {
  AllowedFileTypes,
  IDocument,
  IDocumentFile,
} from "../types/models/document";
import "../models/Document";
import { IUser } from "../models/User";
import { getDocument, getUserFilesFromFB } from "../helpers/file.helper";
import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../config/file_upload";

const DocumentModel = new CRUD_Resssource(allModelName.DOCUMENT);

export const createDocumentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Looking for file: ", req.file);
  if (!req.file) return next(new CustomError(400, "No File provided"));

  try {
    if (!req.filePath) return next(new CustomError(500, "Couldn't upload"));

    const user = req.user as IUser;
    const newDocumentData = {
      user: user._id,
      file: {
        name: req.file.originalname,
        full_path: req.filePath,
        mimetype: req.file.mimetype as AllowedFileTypes,
        size: req.file.size,
      },
    };

    const response = await DocumentModel.createRessource(newDocumentData);

    if (!response.status) {
      return next(new CustomError(500, response.message));
    }
    console.log("Response: ", response);
    return res
      .status(201)
      .send({ message: response.message, data: response.data });
  } catch (error) {
    console.log("On ", error);
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

export const getUserFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user as IUser;

  const response = await getUserFilesFromFB(_id);

  if (!response.status) {
    return next(response.error);
  }

  const urls: (IDocumentFile & { url: string })[] = [];

  const allFiles = response.data;

  for (let i = 0; i < allFiles.length; i++) {
    const file = allFiles[i].file;
    try {
      const fileRef = ref(firebaseStorage, file.full_path);
      const fileURL = await getDownloadURL(fileRef);

      urls.push({ url: fileURL, ...file });
    } catch (error) {
      console.log("While downloading Files URLs -- Error: ", error);
    }
  }

  res.send({ data: urls });
};

export function splitLastOccurrence(str: string, substring: string) {
  const lastIndex = str.lastIndexOf(substring);

  const before = str.slice(0, lastIndex);

  const after = str.slice(lastIndex + 1);

  return [before, after];
}
