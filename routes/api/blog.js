"use strict";
exports.__esModule = true;
var config_1 = require("../config");
var blog_1 = require("../db/blog");
var express = require("express");
var blog_sql_1 = require("../db/blog.sql");
var router = express.Router();
var blogDb = new blog_1["default"](config_1.mongodb, 'lawbook');
var blogSQL = new blog_sql_1["default"]();
router.post('/create', function (req, res) {
    console.log("reached here");
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
        blogDb.getFavoritesBlog(res, req.params.id);
    }
    catch (error) {
        res.status(403);
        res.json("parameter error");
        res.end();
    }
});
router.get('/blog_shelf/:user_id/:blog_id', function (req, res) {
    blogSQL.retrieveFromShelf(res, req.params.blog_id, req.params.user_id);
});
router.post('/remove_favorite/:user_id/:blog_id', function (req, res) {
    blogSQL.removeFromFavorite(res, req.params.blog_id, req.params.user_id);
});
router.get('/all_blog_shelf/:user_id', function (req, res) {
    blogSQL.retrieveAllFromShelf(res, req.params.user_id);
});
router.get('/all_author_blog/:user_id', function (req, res) {
    blogDb.getAuthorContent(res, req.params.user_id);
});
router.post('/add_book_shelf', function (req, res) {
    var shelf = req.body;
    shelf.createdDate = shelf.createdDate;
    shelf.createdDate = shelf.createdDate.toString();
    blogSQL.addToShelf(res, shelf);
});
router.get('/related', function (req, res) {
    try {
        blogDb.getAllBlogs(res, 1);
    }
    catch (error) {
        res.status(403);
        res.json("parameter error");
        res.end();
    }
});
module.exports = router;
//# sourceMappingURL=blog.js.map