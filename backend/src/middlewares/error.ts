import { NextFunction, Request, Response } from "express";
import { CustomErrorInt } from "../types/error";
import { extractStatusAndMessageFromErr } from "../helpers/error.helper";

export default (
    err: Error | CustomErrorInt,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { status, message } = extractStatusAndMessageFromErr(err);
    res.status(status).send({ message });
};
