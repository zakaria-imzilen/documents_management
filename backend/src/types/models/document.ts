import { Types } from "mongoose";

export interface IDocument {
  user: Types.ObjectId;
  file: IDocumentFile;
}

export interface IDocumentFile {
  full_path: string;
  mimetype: AllowedFileTypes;
  name: string;
  size: number;
}

export interface IDocumentDB extends IdleDeadline {
  _id: string;
  __v: string;
}

export enum AllowedFileTypes {
  PNG = "image/png",
  JPEG = "image/jpeg",
  WEBP = "image/webp",
  PDF = "application/pdf",
}
