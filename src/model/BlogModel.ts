import mongoose, { Schema, model, Document, Model } from "mongoose";
import UserModel from "./UserModel";

interface IBlog extends Document {
    title: string;
    content: string;
    status: "draft" | "published";
    tag: "Education" | "Tech" | "Travel" | "Entertainment" | "Other";
    created_by:mongoose.Schema.Types.ObjectId;
}

const BlogSchema: Schema<IBlog> = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            required: true,
        },
        tag: {
            type: String,
            enum: ["Education", "Tech", "Travel", "Entertainment", "Other"],
            required: true,
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const BlogModel: Model<IBlog> = mongoose.models.Blog || model<IBlog>("Blog", BlogSchema);

export default BlogModel;
