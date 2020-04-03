'use strict';
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bcrypt = require('bcryptjs');
const saltRounds = bcrypt.genSaltSync(10);
const cryptoRandomString = require('crypto-random-string');
const FileReader = require('filereader');
var fileReader = new FileReader();
const util = require('../utils/utils');
var auth = require("./auth");

var connection = mysql.createConnection(util.db);


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
router.post('/login', function (req, res) {
    var form = req.body;
    console.log(form);
    var query = "SELECT * FROM user WHERE email = " + mysql.escape(form.email);
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
                function createUserSession() {
                    let random = cryptoRandomString({ length: 20 });
                    if (auth.isUnique(random)) {
                        return {
                            user: results[0],
                            session: random,
                            duration: parseInt(Date.now()) + config.duration * 60000
                        }
                    }
                    else {
                        createUserSession();
                    }
                
                }
                let session = createUserSession();
                auth.sessions.push(session);
                console.log(session);
                results[0].password = null;
                var data = {
                    session: session.session,
                    user: results[0],
                    response: "successful"
                }   
                res.json(data);
                res.end();
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
    var hash = bcrypt.hashSync(user.password, saltRounds)
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





});
router.get("/books", function (req, res) {
    var query = "SELECT * FROM book WHERE available = 1";
    connection.query(query, function (err, result) {
        if (err) {
            res.statusCode(503);
            res.json("error occured we are aware and are resolving it...");
            return;

        }
        console.log(result);
       
        res.json(result);
        res.end();

    })
})

module.exports = router;
