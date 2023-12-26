import { IDocumentDB } from "./models/document";

export type CreateRessourceSuccResponse = {
    status: true;
    message: string;
    data: IDocumentDB
}

export type CreateRessourceFailResponse = {
    status: false;
    message: string;
}