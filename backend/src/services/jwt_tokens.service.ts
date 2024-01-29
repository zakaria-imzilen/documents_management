import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helpers/error.helper";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";
import { IUser } from "../models/User";

config({ path: __dirname + "../environments/.env" });

const EXPIRES_IN_ACCESS = "1d";
const EXPIRES_IN_REFRESH = "3d";

export const generateTokens = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        console.log("While generation tokens - Req.User is empty!");
        return next(
            new CustomError(500, "Something went wrong - while generation tokens")
        );
    }

    const tokens = retrieveSecretKeys_FromENV();
    if (!tokens)
        return next(
            new CustomError(500, "Something went wrong - while generating tokens")
        );

    const { accessKey, refreshKey } = tokens;

    try {
        const user = req.user as IUser;

        const payload = user._id;
        const accessToken = sign({ _id: payload }, accessKey, {
            expiresIn: EXPIRES_IN_ACCESS,
        });
        const refreshToken = sign({ _id: payload }, refreshKey, {
            expiresIn: EXPIRES_IN_REFRESH,
        });

        res
            .cookie("access_token", accessToken)
            .cookie("refresh_token", refreshToken);

        next(); // 👉🏻 Update his Last time logged in
    } catch (error) {
        next(error);
    }
};

export const retrieveSecretKeys_FromENV = ():
    | false
    | { accessKey: string; refreshKey: string } => {
    const secretKey_AccessToken = process.env.JWT_AccessToken;
    const secretKey_RefreshToken = process.env.JWT_RefreshToken;

    if (!secretKey_AccessToken || !secretKey_RefreshToken) {
        console.log(
            "While generation tokens - Could not retrieve Secret key for Access/Refresh Token"
        );
        return false;
    }
    return {
        accessKey: secretKey_AccessToken,
        refreshKey: secretKey_RefreshToken,
    };
};

export const generateAccessToken = (payload: string): string | false => {
    const tokens = retrieveSecretKeys_FromENV();
    if (!tokens) return false;

    const { accessKey } = tokens;

    try {
        const accessToken = sign({ _id: payload }, accessKey, {
            expiresIn: EXPIRES_IN_ACCESS,
        });
        return accessToken;
    } catch (error) {
        console.log("Error: ", error);
        return false;
    }
};
