"use strict";
exports.__esModule = true;
var cloudinary_1 = require("cloudinary");
var config_1 = require("../config");
cloudinary_1.v2.config(config_1.cloudinary);
var blog_1 = require("../db/blog");
var express = require("express");
var router = express.Router();
var blogDb = new blog_1["default"](config_1.localMongo, 'lawbook');
router.post('/create_post', function (req, res) {
    var blog = req.body;
    blog.createdDate = new Date();
    blog.rate = 0;
    blog.views = 0;
    blogDb.createBlog(res, blog);
});
module.exports = router;
//# sourceMappingURL=social.js.map