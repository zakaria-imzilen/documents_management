import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { generateAccessToken, retrieveSecretKeys_FromENV } from "../../services/jwt_tokens.service";
import User from "../../models/User";
import { CustomError } from "../../helpers/error.helper";

export default async (req: Request, res: Response, next: NextFunction) => {
    const resp = retrieveAndDecodeAccessToken(req, res);
    console.log("Respo", resp)
    if (typeof resp == "string") {
        try {
            const findUser = await User.findByIdAndUpdate(
                resp,
                {
                    lastLogin: new Date().toTimeString(),
                },
                { new: true }
            );
            if (!findUser) return next(new CustomError(404, "User not found"));

            req.user = findUser;
            return next();
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }
    next(new CustomError(400, "Session Expired"));
};

const retrieveAndDecodeAccessToken = (req: Request, res: Response): false | string => {
    const accessToken = req.cookies.access_token;
    console.log("Cookies", req.cookies)
    if (!accessToken) {
        console.log("No access token here");
        return false;
    }
    const tokens = retrieveSecretKeys_FromENV();
    if (!tokens) {
        console.log("No secret");
        return false;
    }

    const { accessKey, refreshKey } = tokens;

    try {
        const payload = verify(accessToken, accessKey) as JwtPayload;
        console.log("Access Token - Payload: ", payload);
        if (payload._id) {
            return payload._id;
        }
        return false;
    } catch (error) {
        // Check Refresh Tokens
        const refreshToken = req.cookies.refresh_token;

        try {
            const payload = verify(refreshToken, refreshKey) as JwtPayload;
            console.log("Refresh Token - Payload: ", payload);

            if (payload._id) {
                const newAccessToken = generateAccessToken(payload._id);
                if (!newAccessToken) return false;

                res.cookie("access_token", newAccessToken);
                return payload._id;
            }
            return false;
        } catch (error) {
            return false;
        }
    }
};
