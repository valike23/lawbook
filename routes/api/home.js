"use strict";
exports.__esModule = true;
var config_1 = require("../config");
var express = require("express");
var home_1 = require("../db/home");
var blog_1 = require("../db/blog");
var router = express.Router();
var homeDb = new home_1["default"](config_1.localMongo, 'lawbook');
var blogDb = new blog_1["default"](config_1.localMongo, 'lawbook');
router.post('/personalities', function (req, res) {
    var personalities = req.body;
    homeDb.addPersonalities(res, personalities);
});
router.get('/personalities', function (req, res) {
    homeDb.getPersonalities(res);
});
router.get('/blog', function (req, res) {
    blogDb.getTopBlogs(res, 1);
});
module.exports = router;
//# sourceMappingURL=home.js.map