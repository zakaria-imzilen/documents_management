export interface IDocument {
    user: {
        fullName: string;
        email: string;
    };
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
