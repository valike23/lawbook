"use strict";
exports.__esModule = true;
var mysql = require("mysql");
var mysql_1 = require("mysql");
var express_1 = require("express");
var auth_1 = require("../auth");
var auth = new auth_1.Auth();
var router = express_1.Router();
var bcrypt = require('bcryptjs');
var saltRounds = bcrypt.genSaltSync(10);
var cryptoRandomString = require('crypto-random-string');
var config_1 = require("../config");
var connection = mysql_1.createConnection(config_1.dbFree);
router.post('/login', function (req, res) {
    var form;
    form = req.body;
    console.log(form);
    var query = "SELECT * FROM user WHERE email = " + mysql.escape(form.email);
    connection.query(query, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.json("something went wrong!!");
            res.end();
            return;
        }
        console.log("test results", results);
        if (results.length > 0) {
            console.log("eenter");
            var test = bcrypt.compare(form.password, results[0].password);
            test.then(function (resd) {
                if (resd) {
                    console.log("status", resd);
                    var session = auth.createSession(results[0]);
                    session.user.password = null;
                    res.json(session);
                    res.end();
                }
                else if (!resd) {
                    var data = {
                        user: '',
                        response: "password is incorrect!!!!"
                    };
                    res.status(402);
                    res.json("password is incorrect!!!!");
                    res.end();
                }
            }, function (myErr) {
                console.log(myErr);
                res.status(503);
                res.json("password conversion failed");
                res.end();
            });
        }
        else {
            var data = {
                user: '',
                response: "email is incorrect!!!!"
            };
            res.status(402);
            res.json("email is incorrect!!!!");
            res.end();
        }
    });
});
router.get('/is_logged/:session', function (req, res) {
    var session = req.params.session;
    var result = auth.isAuth(session);
    res.json(result);
    res.end();
});
module.exports = router;
//# sourceMappingURL=accounts.js.map