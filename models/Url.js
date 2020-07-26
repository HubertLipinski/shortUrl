const { request } = require("express");

const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    longUrl: String,
    shortUrl: String,
    urlCode: String,
    // todo add a slug
    date: { type: String, default: Date.now() }
});

module.exports = mongoose.model('Url', urlSchema);