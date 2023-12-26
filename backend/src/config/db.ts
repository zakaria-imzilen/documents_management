import { config } from "dotenv";
import { connect } from "mongoose";
import database from "./logs/database";
import { NextFunction, Request, Response } from "express";
import {
    CustomError,
    extractStatusAndMessageFromErr,
} from "../helpers/error.helper";

config({ path: __dirname + "/../environments/.env" });

const db_uri = process.env.DB_URI;

export default async (req: Request, res: Response, next: NextFunction) => {
    if (!db_uri) {
        console.log(__dirname + "../environments/.env")
        const { status, message } = new CustomError(
            500,
            "Could not capture DB URI"
        );
        database.error(message);
        return next({ status, message: "Server's error" });
    }
    try {
        await connect(db_uri, { dbName: "documents_management" });
        console.log("✅ DB -- Connected")
        next();
    } catch (error) {
        console.log(error)
        next(extractStatusAndMessageFromErr(error));
    }
};
