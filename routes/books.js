"use strict";
var express = require('express');
var router = express.Router();
var root = require('./config').rootDir;

router.get('/', function (req, res) {
    res.sendFile(root + '/pages/lib.html' );
});
router.get('/books', function (req, res) {
    res.sendFile(root + '/pages/lib/books.html');
});
router.get('/books/details', function (req, res) {
    res.sendFile(root + '/pages/lib/details.html');
});

router.get('/pay', function (req, res) {
    res.sendFile(root + '/pages/pay.html');
});

router.get('/statutes', function (req, res) {
    res.sendFile(root + '/pages/lib/status.html');
});

module.exports = router;