import { Model, model } from "mongoose";
import { IDocument } from "../types/models/document";
import { allModelName } from "../types/models";
import {
    CreateRessourceFailResponse,
    CreateRessourceSuccResponse,
} from "../types/crud";
import { extractStatusAndMessageFromErr } from "../helpers/error.helper";

export default class CRUD_Resssource {
    modelName: string;
    ressourceModel: Model<any>;

    constructor(modelName: allModelName) {
        this.modelName = modelName;
        this.ressourceModel = model(modelName);
    }

    async createRessource(
        newData: IDocument
    ): Promise<CreateRessourceSuccResponse | CreateRessourceFailResponse> {
        try {
            const newDocument = await this.ressourceModel.create(newData, {
                new: true,
            });
            return {
                status: true,
                message: "Document created successfully",
                data: newDocument[0],
            };
        } catch (error) {
            return {
                status: false,
                message: extractStatusAndMessageFromErr(error).message,
            };
        }
    }
}
