import isURL from 'valid-url'
import shortid from 'shortid';
import urlModel from '../model/urlModel.js';

export const createUrl = async (req, res) => {
    try {
        // let reqData = req.bodu
        // let { longUrl } = reqData;

        if (req.body.longUrl.trim()) {
            const url = isURL.isUri(req.body.longUrl)
            if (!url) return res.status(400).json({ status: false, message: "Please, Provide valid Url" })
        } else {
            return res.status(400).json({ status: false, message: "Please, Provide Long Url" })
        }

        const data = await urlModel.findOne({ longUrl: req.body.longUrl }).select({ _id: 0, longUrl: 1, shortUrl: 1, urlCode: 1 })
        if (data) {
            return res.status(200).json({ status: true, data: data })
        } else {

            req.body.urlCode = shortid.generate().toLowerCase()
            req.body.shortUrl = `https://localhost:3000/${urlCode}`
            console.log(req.body);
            await urlModel.create(req.body)
            const saveData = await urlModel.findOne({ status: true, longUrl: req.body.longUrl }).select({ _id: 0, longUrl: 1, shortUrl: 1, urlCode: 1 })
            return res.status(201).json({ status: true, data: saveData })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error })
    }
}