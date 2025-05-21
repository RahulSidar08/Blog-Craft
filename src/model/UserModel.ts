import mongoose, { Schema, model, Document, Model } from "mongoose";

interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
}

const userSchema: Schema<IUser> = new Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const UserModel: Model<IUser> = mongoose.models.User || model<IUser>("User", userSchema);

export default UserModel;
