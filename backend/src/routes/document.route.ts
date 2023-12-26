import { NextFunction, Request, Response, Router } from "express";
import { createDocumentController } from "../controllers/document.controller";
import { uploadDocument } from "../middlewares/document/file_operations";
import { body } from "express-validator";
import request_validation from "../middlewares/request_validation";

const documentRoute = Router();

const validateBody_User = [body("fullName").notEmpty(), body("email").isEmail()];

documentRoute.post(
    "/",
    uploadDocument,
    validateBody_User,
    request_validation,
    createDocumentController
);

export default documentRoute;
