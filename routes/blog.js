"use strict";
exports.__esModule = true;
var express_1 = require("express");
var auth_1 = require("../routes/auth");
var auth = new auth_1.Auth();
var router = express_1.Router();
var root = require('./config').rootDir;
router.get('/', function (req, res) {
    res.sendFile(root + '/pages/blog.html');
});
router.get('/top_post', function (req, res) {
    res.sendFile(root + '/pages/blog/top.html');
});
router.get('/favorites', function (req, res) {
    res.sendFile(root + '/pages/blog/favorite.html');
});
router.get('/all', function (req, res) {
    res.sendFile(root + '/pages/blog/all.html');
});
router.get('/author/:session', function (req, res) {
    console.log(req.params.session);
    var user;
    user = auth.isAuth((req.params.session).trim());
    console.log('user', user);
    if (user) {
        if (user.user.type == "author") {
            console.log("registered");
            res.sendFile(root + '/pages/blog/author-home.html');
        }
        else {
            res.sendfile(root + '/pages/blog/become_an_author.html');
        }
    }
    else {
        res.redirect('/login');
    }
});
router.get('/create_blog', function (req, res) {
    res.sendFile(root + '/pages/blog/author.html');
});
router.get('/manage_blog', function (req, res) {
    res.sendFile(root + '/pages/blog/manage_blog.html');
});
router.get('/content/:data', function (req, res) {
    res.sendFile(root + '/pages/blog/content.html');
});
module.exports = router;
//# sourceMappingURL=blog.js.map