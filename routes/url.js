const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

// @route   POST /api/url/shorten
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body
    let { slug } = req.body;
    const baseUrl = config.get('baseUrl');

    if(!validUrl.isWebUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }

    // Generate URL
    let urlCode = shortid.generate();

    console.log(urlCode, slug);


    if(validUrl.isWebUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            let slugInUse = false;
            if(req.body.slug) {
                slug = req.body.slug
                urlCode = slug;
                slugInUse = await Url.exists({ urlCode: slug });
            }

            console.log(slugInUse, slug);

            if(slugInUse) {
                res.status(400).json('Slug in use'); 
            }

            if(url && typeof slug === 'undefined') {
                res.json(url);
            } else {
                
                let shortUrl = baseUrl + '/' + urlCode;
                if(!slugInUse && typeof slug !== 'undefined') {
                    shortUrl = baseUrl + '/' + slug;
                }

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
            console.error(error);
            res.status(500).json('Server error');
        }
    } else {
        res.status(400).json('Invalid URL');
    }

});

 module.exports = router;