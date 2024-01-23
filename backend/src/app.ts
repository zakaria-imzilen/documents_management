import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import errorMiddleware from "./middlewares/error";
import badRequest from "./middlewares/badRequest";
import dbConnecting from "./config/db"
import documentRouter from "./routes/document.route";
import cors from "cors";

config({ path: __dirname + "/environments/.env" });

const app = express();

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

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use((req, res, next) => {
    console.log("Request Body: ", req.body);
    next()
})

app.use("/api/document", dbConnecting, documentRouter);

app.use(badRequest);
app.use(errorMiddleware);

export default app;