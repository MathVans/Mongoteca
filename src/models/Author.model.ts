import mongoose from "mongoose";

export const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please inform the author name"],
        trim: true,
        unique: true,
        maxlength: [50, "The name can't pass the limit of 50 characters"],
    },
    nationality: {
        type: String,
        trim: true,
        maxlength: [
            50,
            "The nationality can't pass the limit of 50 characters",
        ],
    },
    birthYear: {
        type: Number,
        max: [
            new Date().getFullYear(),
            "The birth year can't be in the future",
        ],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
