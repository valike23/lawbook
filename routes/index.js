'use strict';
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'lawbook',

 });
//var connection = mysql.createConnection({
//    host: 'db4free.net',
//    user: 'valey_bank',
//    password: 'valey_bank',
//    database: 'valey_bank',
//    port: "3306"

//});

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
router.post('/login', function (req, res) {
    var form = req.body;
    console.log(form);
    res.json("hitted");
    res.end();
})
router.get("/checkUser/:username", function (req, res) {
    var user = req.param.username;
    console.log(user);
    connection.query("")

})

module.exports = router;
