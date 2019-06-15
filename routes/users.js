'use strict';
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bcrypt = require('bcryptjs');
const saltRounds = bcrypt.genSaltSync(10);

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'lawbook'

});

router.use(aunthenticate)
//var connection = mysql.createConnection({
//    host: 'db4free.net',
//    user: 'law_book',
//    password: 'law_book',
//    database: 'law_book'
//});
/* GET users listing. */
router.get('/', function (req, res) {
    var comment;
    if (req.body.isAuth) {
        comment = "authentication is successful!!!"
    }
    else {
        comment = "authentication failed"
    }
    res.send(comment);
});

function aunthenticate(req, res, next) {
    var time = date.now();
    var query = "";
    console.log("authentication started");
    req.body.isAuth = true;
    next();
}




module.exports = router;
