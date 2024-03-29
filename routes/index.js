const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route   GET /
router.get('/', (req, res) => {
    res.sendFile('index.html');
})

// @route   GET /:code
router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });
        if(url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No url found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');        
    }
});

 module.exports = router;
