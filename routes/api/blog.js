"use strict";
exports.__esModule = true;
var config_1 = require("../config");
var blog_1 = require("../db/blog");
var express = require("express");
var router = express.Router();
var blogDb = new blog_1["default"](config_1.mongodb, 'lawbook');
router.post('/create', function (req, res) {
    var blog = req.body;
    blog.createdDate = new Date();
    blog.rate = 0;
    blog.views = 0;
    blogDb.createBlog(res, blog);
});
router.get('/top/:id', function (req, res) {
    try {
        blogDb.getTopBlogs(res, req.params.id);
    }
    catch (error) {
        res.status(403);
        res.json("parameter error");
        res.end();
    }
});
router.get('/all/:id', function (req, res) {
    try {
        blogDb.getAllBlogs(res, req.params.id);
    }
    catch (error) {
        res.status(403);
        res.json("parameter error");
        res.end();
    }
});
router.get('/content/:id', function (req, res) {
    try {
        blogDb.getContent(res, req.params.id);
    }
    catch (error) {
        res.status(403);
        res.json("parameter error");
        res.end();
    }
});
router.get('/favorites/:page/:id', function (req, res) {
    try {
        blogDb.createIndex(res);
    }
    catch (error) {
        res.status(403);
        res.json("parameter error");
        res.end();
    }
});
module.exports = router;
//# sourceMappingURL=blog.js.map