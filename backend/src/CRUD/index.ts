import { Model, model } from "mongoose";
import { IDocument } from "../types/models/document";
import { allModelName } from "../types/models";
import {
  CreateRessourceFailResponse,
  CreateRessourceSuccResponse,
  GetRessourceWithFilterFailResponse,
  GetRessourceWithFilterSuccResponse,
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
    console.log("Uploading, here's its data: ", newData);

    try {
      const newDocument = await this.ressourceModel.create(newData);
      console.log("New document", newDocument);
      return {
        status: true,
        message: `${this.modelName} created successfully`,
        data: newDocument,
      };
    } catch (error) {
      console.log("Failed in creating: ", error);
      return {
        status: false,
        message: extractStatusAndMessageFromErr(error).message,
      };
    }
  }

  async getRessourceWithFilter(
    filter: object
  ): Promise<
    GetRessourceWithFilterSuccResponse | GetRessourceWithFilterFailResponse
  > {
    try {
      const documents = await this.ressourceModel.find(filter);
      return {
        status: true,
        message: `${this.modelName}s retrieved`,
        data: documents,
      };
    } catch (error) {
      return {
        status: false,
        message: extractStatusAndMessageFromErr(error).message,
      };
    }
  }
}
