"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1.Router();
var root = require('./config').rootDir;
router.get('/', function (req, res) {
    res.sendFile(root + '/pages/blog.html');
});
router.get('/top_post', function (req, res) {
    res.sendFile(root + '/pages/blog/top.html');
});
router.get('/favorites', function (req, res) {
    res.sendFile(root + '/pages/blog/favorites.html');
});
router.get('/all', function (req, res) {
    res.sendFile(root + '/pages/blog/all.html');
});
router.get('/author/:session', function (req, res) {
    console.log(req.params.session);
    res.sendFile(root + '/pages/blog/author.html');
});
module.exports = router;
//# sourceMappingURL=blog.js.map