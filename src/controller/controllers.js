import shortid from 'shortid';
import axios from 'axios';
import urlModel from '../model/urlModel.js';

export const createUrl = async (req, res) => {
    console.log(req.params);
    try {
        if (req.body.longUrl) {
            req.body.longUrl = req.body.longUrl.trim()
            if (!req.body.longUrl) return res.status(400).json({ status: false, message: "Please, Provide URL" })
        } else {
            return res.status(400).json({ status: false, message: "Please, Provide URL" })
        }

        const data = await urlModel.findOne({ longUrl: req.body.longUrl }).select({ _id: 0, longUrl: 1, shortUrl: 1, urlCode: 1 })
        if (data) {
            return res.status(200).json({ status: true, data: data })
        } else {
            await axios.get(req.body.longUrl).then(async (response) => {
                req.body.urlCode = shortid.generate().toLowerCase()
                req.body.shortUrl = `http://${req.headers.host}/${req.body.urlCode}`
                await urlModel.create(req.body)
                const saveData = await urlModel.findOne({ longUrl: req.body.longUrl }).select({ _id: 0, longUrl: 1, shortUrl: 1, urlCode: 1 })
                return res.status(201).send({ status: true, data: saveData })
            })
                .catch((error) => {
                    return res.status(400).send({ status: false, message: "Please, Provide valid URL" })
                })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error })
    }
}


export const getURL = async (req, res) => {
    try {
        if (req.params.urlId) {
            const data = await urlModel.findOne({ urlCode: req.params.urlId })
            if (data) {
                return res.status(302).redirect(data.longUrl)
            } else {
                return res.status(404).send({ status: false, message: "URL not found" })
            }
        } else {
            return res.status(404).send({ status: false, message: "URL not found" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error })
    }
}