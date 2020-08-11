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
var social_1 = require("../db/social");
var router = express.Router();
var socialDb = new social_1["default"](config_1.mongodb, 'lawbook');
router.use(function (req, res, next) {
    console.log("sound", req.headers.authorization);
    if (auth.isAuth(req.headers.authorization)) {
        next(auth.isAuth(req.headers.authorization));
    }
    else {
        res.status(406);
        res.json("you are not logged in");
        res.end();
        return;
    }
});
router.post('/create_post', middleWare, function (req, res) {
    console.log('req.files');
    var thumbFile = req.files.thumb.path;
    var post;
    post = req.body;
    post.userId = 7;
    post.createdDate = new Date();
    post.likes = 0;
    post.dislikes = 0;
    cloudinary_1.v2.uploader.upload(thumbFile, function (err, response) {
        if (err) {
            console.log(err.message);
            res.status(503);
            res.json(err.name);
            return;
        }
        post.secureImage = response.secure_url;
        post.image = response.url;
        post.publicId = response.public_id;
        socialDb.createPost(res, post);
    });
});
module.exports = router;
//# sourceMappingURL=social.js.map