import mongoose from "mongoose";
const { Schema, model } = mongoose

const urlSchema = new Schema(
    {
        urlCode: {
            type: String,
            uniquie: true
        },
        longUrl: {
            type: String,
            require: true
        },
        shortUrl: {
            type: String,
            require: true,
            uniquie: true
        }
    }
)

export default model("url", urlSchema)