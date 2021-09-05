require('dotenv').config();
const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');

const Url = require('../models/Url');

// @route   POST /api/url/shorten
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = process.env.BASE_URL;

    if(!validUrl.isWebUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }

    let urlCode = null;
    if(validUrl.isWebUri(longUrl)) {
        try {
            let shouldSaveWithSlug = false;
            if (req.body.slug) {
                const slug = req.body.slug;
                let slugExist = await Url.findOne({ urlCode: slug });
                if (slugExist)
                    res.status(401).json('Slug in use!');
                else {
                    urlCode = slug;
                    shouldSaveWithSlug = true;
                }
            }

            if(urlCode === null)
                urlCode = shortid.generate(5);

            let url = await Url.findOne({ longUrl });
            if(url && !shouldSaveWithSlug) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                
                await url.save();
                res.json(url);
            }
        } catch (error) {
            res.status(500).json('Server error');
        }
    } else {
        res.status(400).json('Invalid URL');
    }
});

module.exports = router;
