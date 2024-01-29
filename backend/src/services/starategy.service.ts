import passport from "passport";
import { Strategy } from "passport-local";
import User, { IUser } from "../models/User";
import { retrieveSecretKeys_FromENV } from "./jwt_tokens.service";
import { Request } from "express";

export const LocalStrategy = new Strategy(
    { usernameField: "email" },
    async (email, password, done) => {
        try {
            const findUser = await User.findOne({ email });
            console.log("Finding user: ", findUser);
            if (!findUser)
                return done(null, false, { message: "No user with that email" });

            if (findUser.password !== password)
                return done(null, false, { message: "Wrong credentials" });

            done(null, findUser);
        } catch (error) {
            done(error, false);
        }
    }
);

var cookieExtractor = function (req: Request) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
};

const tokens = retrieveSecretKeys_FromENV();
const opts: any = {};
opts.jwtFromRequest = cookieExtractor;

if (tokens) {
    opts.secretOrKey = tokens.accessKey;
} else {
    opts.secretOrKey = "jkns3rewofdsinfd";
}

passport.serializeUser((user, done) => {
    const actualUser = user as IUser;
    done(null, actualUser._id);
});
passport.deserializeUser((user, done) => {
    if (!user) return done({ message: "User not found" }, false);
    done(null, user);
});

passport.use(LocalStrategy);
