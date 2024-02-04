import { Router } from "express";
import {
  createDocumentController,
  getUserDocuments,
  getUserFiles,
} from "../controllers/document.controller";
import {
  deleteDocument,
  uploadDocumentOnFirebase,
} from "../middlewares/document/file_operations";
import loginToken from "../middlewares/auth/loginToken";
import { temporaryStorage } from "../config/file_upload";

const documentRouter = Router();

documentRouter.get(
  "/",
  loginToken,
  // getUserDocuments
  getUserFiles
);

documentRouter.post(
  "/",
  loginToken,
  temporaryStorage.single("document"),
  uploadDocumentOnFirebase,
  createDocumentController
);

documentRouter.delete("/:path", deleteDocument);

export default documentRouter;
