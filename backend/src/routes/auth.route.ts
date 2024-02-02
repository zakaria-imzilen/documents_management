import { Router } from "express";
import {
  Auth_Register,
  Log_Out,
  Login_Validation,
  Register_Validation,
  Successful_Auth_Contr,
  updateLastLogin,
} from "../services/auth.service";
import { generateTokens } from "../services/jwt_tokens.service";
import request_validation from "../middlewares/request_validation";
import passport from "passport";
import loginToken from "../middlewares/auth/loginToken";

const authRouter = Router();

authRouter.post(
  "/login",
  Login_Validation,
  request_validation,
  passport.authenticate("local", {
    failureMessage: true,
  }),
  generateTokens,
  updateLastLogin,
  Successful_Auth_Contr
);

authRouter.get("/token", loginToken, updateLastLogin, Successful_Auth_Contr);

authRouter.get("/logout", Log_Out);

authRouter.post(
  "/register",
  Register_Validation,
  request_validation,
  Auth_Register,
  generateTokens,
  Successful_Auth_Contr
);

export default authRouter;
