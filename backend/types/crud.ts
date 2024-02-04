import { IDocument, IDocumentDB } from "./models/document";

export type CreateRessourceSuccResponse = {
    status: true;
    message: string;
    data: IDocumentDB
}

export type CreateRessourceFailResponse = {
    status: false;
    message: string;
}

export type GetRessourceWithFilterSuccResponse = {
    status: true;
    message: string;
    data: IDocument[]
}

export type GetRessourceWithFilterFailResponse = {
    status: false;
    message: string;
}