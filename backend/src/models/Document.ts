import { Schema, model } from "mongoose";
import { IDocument } from "../types/models/document";

var validateEmail = function (email: string): boolean {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const schema = new Schema(
    {
        user: {
            fullName: {
                type: String,
                // required: true,
            },
            email: {
                type: String,
                // required: "Email address is required",
                trim: true,
                lowercase: true,
                // unique: true,
                validate: [validateEmail, "Please fill a valid email address"],
                match: [
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    "Please fill a valid email address",
                ],
            },
        },
        file: {
            full_path: String,
            mimetype: {
                type: String,
                enum: [
                    "image/png",
                    "image/jpeg",
                    "image/png",
                    "image/webp",
                    "application/pdf",
                ],
            },
        },
    },
    {
        timestamps: true,
    }
);

export default model<IDocument>("Document", schema);
