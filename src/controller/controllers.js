import shortid from 'shortid';
import axios from 'axios';
import urlModel from '../model/urlModel.js';
import { ASYNC_GET, ASYNC_SET } from '../util/redis/redis.js';

// POST API ------------------------------------------------------------------------------------------------------------------------->
export const createUrl = async (req, res) => {
    try {
        if (req.body.longUrl) {
            req.body.longUrl = req.body.longUrl.trim()
            if (!req.body.longUrl) return res.status(400).json({ status: false, message: "Please, Provide URL" })
        } else {
            return res.status(400).json({ status: false, message: "Please, Provide URL" })
        }
        const data = await urlModel.findOne({ longUrl: req.body.longUrl }).select({ _id: 0, longUrl: 1, shortUrl: 1, urlCode: 1 })
        if (data) {
            const cacheData = await ASYNC_GET(req.body.longUrl)
            if (cacheData) {
                return res.status(201).send({ status: true, message: JSON.parse(cacheData) })
            } else {
                await ASYNC_SET(`${req.body.longUrl}`, JSON.stringify(data))
                return res.status(201).send({ status: true, data: data })
            }
        } else {
            await axios.get(req.body.longUrl).then(async (response) => {
                req.body.urlCode = shortid.generate().toLowerCase()
                req.body.shortUrl = `http://${req.headers.host}/${req.body.urlCode}`
                await urlModel.create(req.body)
                const saveData = await urlModel.findOne({ longUrl: req.body.longUrl }).select({ _id: 0, longUrl: 1, shortUrl: 1, urlCode: 1 })
                await ASYNC_SET(`${req.body.longUrl}`, JSON.stringify(saveData))
                res.status(201).send({ status: true, data: saveData })
            })
                .catch((error) => {
                    return res.status(400).send({ status: false, message: "Please, Provide valid URL" })
                })

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message })
    }
}

// GET API -------------------------------------------------------------------------------------------------------------------------->
export const getURL = async (req, res) => {
    try {
        if (req.params.urlId) {
                const fetchFromCache = await ASYNC_GET(req.params.urlId)
            if (fetchFromCache) {
                return res.status(302).redirect(JSON.parse(fetchFromCache))
            } else {
                const data = await urlModel.findOne({ urlCode: req.params.urlId })
                if (data) {
                    await ASYNC_SET(req.params.urlId, JSON.stringify(data.longUrl))
                    return res.status(302).redirect(data.longUrl)
                } else {
                    return res.status(404).send({ status: false, message: "URL not found" })
                }
            }
        } else {
            return res.status(404).send({ status: false, message: "URL not found" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error })
    }
}