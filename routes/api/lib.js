"use strict";
exports.__esModule = true;
var cloudinary_1 = require("cloudinary");
var connectM = require('connect-multiparty');
var middleWare = connectM();
var auth_1 = require("../auth");
var auth = new auth_1.Auth();
var config_1 = require("../config");
cloudinary_1.v2.config(config_1.cloudinary);
var express = require("express");
var lib_1 = require("../db/lib");
var router = express.Router();
var libDb = new lib_1["default"](config_1.mongodb, 'lawbook');
router.post('/create', middleWare, function (req, res) {
    console.log(req.files);
    var config;
    var rawFile = req.files.raw.path;
    var thumbFile = req.files.thumb.path;
    var book;
    book = req.body;
    cloudinary_1.v2.uploader.upload(rawFile, { resource_type: "auto" }, function (err, content) {
        if (err) {
            console.log(err.message);
            res.status(503);
            res.json(err.name);
            return;
        }
        cloudinary_1.v2.uploader.upload(thumbFile, function (err, picture) {
            if (err) {
                console.log(err.message);
                res.status(503);
                res.json(err.name);
                return;
            }
            book.picture = picture.url;
            book.content = content.url;
            book.secure_content = content.secure_url;
            book.secured_picture = picture.secure_url;
            book.public_content = content.public_id;
            book.public_picture = picture.public_id;
            libDb.createPost(res, book);
        });
    });
});
router.get('/book/:id', function (req, res) {
    libDb.retrieveBook(res, req.params.id);
});
router.post('/addFavorite', function (req, res) {
    var bookShelf = req.body;
    libDb.addToFavorite(res, bookShelf);
});
module.exports = router;
//# sourceMappingURL=lib.js.map