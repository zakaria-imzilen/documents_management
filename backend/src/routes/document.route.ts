import { Router } from "express";
import { createDocumentController } from "../controllers/document.controller";
import {
    deleteDocument,
    getAllDocuments,
    uploadDocument,
} from "../middlewares/document/file_operations";
import { body } from "express-validator";
import request_validation from "../middlewares/request_validation";

const documentRouter = Router();

const validateBody_User = [
    body("fullName").notEmpty(),
    body("email").isEmail(),
];

documentRouter.get("/", getAllDocuments);

documentRouter.post(
    "/",
    uploadDocument,
    validateBody_User,
    request_validation,
    createDocumentController
);

documentRouter.delete("/:path", deleteDocument);

export default documentRouter;
