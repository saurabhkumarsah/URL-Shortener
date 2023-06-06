import express from "express"
import { createUrl, getURL } from "../controller/controllers.js"
export const router = express.Router()

router.get('/test', (req, res) => {
    res.send("test")
})

router.post('/url/shorten', createUrl)
router.get('/:urlId', getURL)