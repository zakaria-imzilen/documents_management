import { Types } from "mongoose";

export interface IDocument {
    user: Types.ObjectId;
    file: {
        full_path: string;
        mimetype: AllowedFileTypes;
    };
}

export interface IDocumentDB extends IdleDeadline {
    _id: string,
    __v: string
}

export enum AllowedFileTypes {
    PNG = "image/png",
    JPEG = "image/jpeg",
    WEBP = "image/webp",
    PDF = "application/pdf",
}
