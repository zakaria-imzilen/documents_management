import { Schema, Types, model } from "mongoose";

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
            ],
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        lastLogin: {
            type: String,
            default: new Date().toTimeString(),
        },
        image: {
            type: String,
            default: "https://randomuser.me/api/portraits/men/81.jpg"
        }
    },
    { timestamps: true }
);

export interface IUser {
    _id: Types.ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    active: boolean,
    lastLogin: string,
    image: string
}

const User = model<IUser>("User", UserSchema);

export default User;