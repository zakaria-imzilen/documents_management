import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import errorMiddleware from "./middlewares/error";
import badRequest from "./middlewares/badRequest";
import dbConnecting from "./config/db"
import documentRoute from "./routes/document.route";
import bodyParser from "body-parser";
import multer from "multer";

config({ path: __dirname + "/environments/.env" });

const app = express();
const PORT = process.env.PORT;

declare global {
    namespace Express {
        interface Request {
            fileName?: string
        }
    }
}

app.use(morgan("dev"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/document", dbConnecting, documentRoute);

app.use(badRequest);
app.use(errorMiddleware);
app.listen(PORT, () => console.log("Listening on: " + PORT));
