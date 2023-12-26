import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomError, formatExpressValidErrors } from "../helpers/error.helper";

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrMessage = formatExpressValidErrors(errors.array());
        next(new CustomError(422, formattedErrMessage));
        return;
    }

    next();
}