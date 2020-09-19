"use strict";
var express = require('express');
var router = express.Router();
var root = require('./config').rootDir;

router.get('/', function (req, res) {
    res.sendFile(root + '/pages/social/wall.html');
});
router.get('/personal', function (req, res) {
    res.sendFile(root + '/pages/social/personal.html');
});

module.exports = router;