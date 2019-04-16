'use strict';
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//var connection = mysql.createConnection({
//    host: '127.0.0.1',
//    user: 'root',
//    password: '',
//    database: 'lawbook'

// });
var connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'law_book',
    password: 'law_book',
    database: 'law_book'
   

});

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
router.post('/login', function (req, res) {
    var form = req.body;
    console.log(form);
    var query = "SELECT * FROM user WHERE email = " + mysql.escape(form.email) + " AND password = " + mysql.escape(form.pass);
    console.log(query);
    connection.query(query, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.json("something went wrong!!!");
            res.end();

        }
        console.log(results)
        res.json(results);
        res.end();
    })

})
router.get("/checkUser/:username", function (req, res) {
    var user = req.params.username;
    console.log(user);
    var query = "select 1 from user where user.username = " + mysql.escape(user);
    connection.query(query, function (err, result) {
        if (err) {
            console.log(err);
           
            res.json("Database query threw an error: we are working on it already")
         
            res.end();
        }
        res.json(result);
    })

})
router.post('/register', function (req, res) {
    var user = req.body;
    console.log(user);
    var query = "INSERT INTO user SET ?";
    connection.query(query, user, function (err, resu) {
        if (err) {
            console.log(err);
            res.end();
            return;
        }
        res.json({
            message: "user created successfully",
            info: resu
        });
        console.log(resu);
        res.end();
       
    })
   

})

module.exports = router;
