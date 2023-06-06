import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv, { config } from "dotenv"
import { router } from "./route/routes.js";
// import redis from 'redis'
// import { Stringfy}
dotenv.config()
const { PORT, URI } = process.env

const app = express()


app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use('/', router)

try {
    app.listen(PORT, () => {
        console.log(`Server start on PORT: ${PORT}`);
    })
} catch (error) {
    console.log(error);
}

try {
    mongoose.connect(URI)
    console.log("DB is connected...");
} catch (error) {
    console.log(error);
}
