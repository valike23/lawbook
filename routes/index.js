'use strict';
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bcrypt = require('bcryptjs');
const saltRounds = bcrypt.genSaltSync(10);
const cryptoRandomString = require('crypto-random-string');


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
    var query = "SELECT * FROM user WHERE email = " + mysql.escape(form.email);
    console.log(query);
    connection.query(query, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.json("something went wrong!!!");
            res.end();
            return;
        }
        if (results.length > 0) {
            var test = bcrypt.compare(form.pass, results[0].password);
            if (test) {
                console.log(test);
                var session = {
                    userId: results[0].id,
                    session: cryptoRandomString({ length: 20 }),
                    duration: parseInt(Date.now()) + 900000
                }
                var query = "INSERT INTO sessions SET ?";
                connection.query(query, session, function (err, myResult) {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json("Error Occured while creating a session for you, please try again later.");
                        res.end();
                        return;
                    }
                    var data = {
                        seesion: session.session,
                        user: results[0],
                        response: "successful"
                    }
                    console.log(data)
                    res.json(data);
                    res.end();
                })

            }
            else if (!test) {
                var data = {
                    user: null,
                    response: "password is incorrect!!!!"
                }
                res.json(data);
                res.end();
            }
        }
        else {
            var data = {
                user: null,
                response: "email is incorrect!!!!"
            }
            res.json(data);
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
  var hash =  bcrypt.hashSync(user.password, saltRounds) 
    console.log(hash);
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
   
   
   
   

})

module.exports = router;
