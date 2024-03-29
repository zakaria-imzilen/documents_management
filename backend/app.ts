import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import errorMiddleware from "./middlewares/error";
import badRequest from "./middlewares/badRequest";
import dbConnecting from "./config/db";
import documentRouter from "./routes/document.route";
import cors from "cors";
import authRouter from "./routes/auth.route";
import "./services/starategy.service";
import session from "cookie-session";
import cookieParser from "cookie-parser";
import passport from "passport";

config({ path: __dirname + "/environments/.env" });

const app = express();

declare global {
  namespace Express {
    interface Request {
      fileName?: string;
      filePath?: string;
    }
  }
}

app.use(morgan("dev"));
app.use(session({ secret: "njkds2398dsf" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("Request Body: ", req.body);
  console.log("Request Cookies: ", req.cookies);
  next();
});

app.use("/api/document", dbConnecting, documentRouter);
app.use("/api/auth", dbConnecting, authRouter);

app.use(badRequest);
app.use(errorMiddleware);

export default app;
