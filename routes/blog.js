"use strict";
var express = require('express');
var router = express.Router();
var root = require('./config').rootDir;

router.get('/', function (req, res) {
    res.sendFile(root + '/pages/blog.html');
});
router.get('/top_post', function (req, res) {
    res.sendFile(root + '/pages/blog/top.html');
});

module.exports = router;