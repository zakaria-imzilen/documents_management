import { NextFunction, Request, Response } from "express";
import { firebaseStorage } from "../../config/file_upload";
import {
  CustomError,
  extractStatusAndMessageFromErr,
} from "../../helpers/error.helper";
import path from "path";
import { getDirectoryFiles, unlinkDocument } from "../../helpers/file.helper";
import { ref, uploadBytes } from "firebase/storage";
import { AllowedFileTypes } from "../../types/models/document";
import { IUser } from "../../models/User";

const uploadDirectoryPath = path.join(
  __dirname,
  "../../../../../documents_management_upload"
);

export const uploadDocumentOnFirebase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next({ message: "Couldn't process the file" });

  if (
    !Object.values(AllowedFileTypes).includes(
      req.file.mimetype as unknown as AllowedFileTypes
    )
  )
    return next(
      new CustomError(400, "Not allowed type file (only PNG, JPEG, WEBP, PDF)")
    );

  const metadata = {
    contentType: req.file.mimetype,
  };

  try {
    if (!req.user)
      return next(new CustomError(500, "Couldn't retrieve user id"));
    const user = req.user as IUser;
    const userId = user._id;

    const fileName = req.file.originalname;

    const fullPath = userId + "/" + fileName;
    console.log("Full Path: ", fullPath);

    const fileRef = ref(firebaseStorage, fullPath);
    const snapshot = await uploadBytes(fileRef, req.file.buffer, metadata);

    req.filePath = snapshot.ref.toString();
    console.log("Uploaded successfuly", req.filePath);
    next();
  } catch (error) {
    console.log("Uploading file on Firebase error: ", error);
    const err = extractStatusAndMessageFromErr(error);
    next(err);
  }
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
