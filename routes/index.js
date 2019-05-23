﻿'use strict';
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
router.post('/login', function (req, res) {
    var form = req.body;
    console.log(form);
    var query = "SELECT * FROM user WHERE email = " + mysql.escape(form.email);
    console.log(query);
    connection.query(query, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.json("something went wrong!!!");
            res.end();

        }
        if (results.length > 0) {
            bcrypt.compare(form.password, results[0].password, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500);
                    res.json("Error Occured while authenticating, please try again later.");
                    res.end();
                    return;
                }
                if (res == true) {
                    console.log(results)
                    res.json(results);
                    res.end();
                }
                else {

                    res.json("sorry, password incorrect!!!");
                    res.end();
                }
            });

        }
        else {
            res.json("sorry, username does not exist!!!");
            res.end(); 
        }
    
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
    var query = "INSERT INTO user SET ?";
    console.log(user);
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) {
            console.log(err);
            res.status(500);
            res.json("something went wrong when making your account secure");
            res.end();
            return;
        }
        user.password = hash;
        connection.query(query, user, function (err, resu) {
            if (err) {
                console.log(err);
                res.status(503);
                res.json("Something went wrong! dont worry its from us and we are currently working on it. Try again later.");
                res.end();
                return;
            }
            res.json({
                message: "user created successfully",
                info: resu,
                pass: hash
            });
            console.log(resu);
            res.end();

        })
    });
   
   
   

})

module.exports = router;
