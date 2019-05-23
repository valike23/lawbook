'use strict';
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'lawbook'

 });
//var connection = mysql.createConnection({
//    host: 'db4free.net',
//    user: 'law_book',
//    password: 'law_book',
//    database: 'law_book'
//});
/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

module.exports = router;
