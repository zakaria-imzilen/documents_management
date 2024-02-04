import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helpers/error.helper";

export default (req: Request, res: Response, next: NextFunction) =>
    next(new CustomError(404, "Bad Request"));
