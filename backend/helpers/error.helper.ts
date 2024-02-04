import { MongooseError } from "mongoose";
import anyOtherError from "../logs/anyOtherError";
import typeError from "../logs/typeError";
import { CustomErrorInt } from "../types/error";
import database from "../logs/database";
import { ValidationError } from "express-validator";
import { FirebaseError } from "firebase/app";

export class CustomError {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export const extractStatusAndMessageFromErr = (
  err: Error | CustomError | MongooseError | FirebaseError | any
): CustomErrorInt => {
  if (err instanceof Error) {
    typeError.error(err.message);
    return new CustomError(500, "Server's error: Something went wrong");
  } else if (err instanceof CustomError) {
    anyOtherError.error(err);
    return err;
  } else if (err instanceof MongooseError) {
    database.error(err);
    return new CustomError(500, `${err.name}: ${err.message}`);
  } else if (err instanceof FirebaseError) {
    return new CustomError(500, `${err.name}: ${err.message}`);
  } else {
    const errConvertedToJSON = JSON.stringify(err);
    anyOtherError.error(errConvertedToJSON);

    return new CustomError(500, errConvertedToJSON);
  }
};

export const formatExpressValidErrors = (errors: ValidationError[]): string => {
  const msg = errors.map((er) => `${er.type} ${er.msg}`).join(", ");
  return msg;
};
