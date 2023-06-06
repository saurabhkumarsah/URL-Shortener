import express from "express"
import { createUrl, getURL } from "../controller/controllers.js"
export const router = express.Router()

router.post('/url/shorten', createUrl)

router.get('/:urlId', getURL)