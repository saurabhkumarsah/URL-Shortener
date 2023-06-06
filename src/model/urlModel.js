import mongoose from "mongoose";
const { Schema, model } = mongoose

const urlSchema = new Schema(
    {
        longUrl: {
            type: String,
            require: true
        },
        shortUrl: {
            type: String,
            require: true,
            uniquie: true
        },
        urlCode: {
            type: String,
            uniquie: true
        }
    },
    {timestamps: true}
)

export default model("url", urlSchema)