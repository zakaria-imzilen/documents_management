import { body } from "express-validator";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy } from "passport-local";
import User, { IUser } from "../models/User";
import { CustomError } from "../helpers/error.helper";

export const Login_Validation = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Invalid password"),
];

export const Register_Validation = [
    ...Login_Validation,
    body("firstName").notEmpty().withMessage("Invalid first name"),
    body("lastName").notEmpty().withMessage("Invalid last name"),
];

export const Auth_Login = (req: Request, res: Response, next: NextFunction) => {
    try {
        passport.authenticate(
            "local",
            (err: any, user: IUser | undefined, info: { message: string }) => {
                if (err) return next(err);
                if (!user) {
                    console.log("Customer not found", user);
                    return next(new CustomError(400, info.message));
                }

                console.log("User is connected");
                req.user = user;
                next(); // 👉🏻 Tokens time
            }
        )(req, res, next);
    } catch (error) {
        console.log("Catch Block: ", error);
        next(error);
    }
};

export const Auth_Register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newUser = await User.create(req.body);

        req.user = newUser;
        next();
    } catch (error) {
        next(error);
    }
};

export const updateLastLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        console.log("While Updating Last Login - Req.User is empty!");
        return next(
            new CustomError(500, "Something went wrong - While Updating Last Login")
        );
    }

    try {
        const user = req.user as IUser;

        await User.findByIdAndUpdate(user._id, {
            lastLogin: new Date().toTimeString(),
        });

        next();
    } catch (error) {
        next(error);
    }
};

export const Successful_Auth_Contr = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = req.user;
    if (!user) return next(new CustomError(400, "Expired"))
    return res.send({ message: "Logged in successfuly", user });
};
