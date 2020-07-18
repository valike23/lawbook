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
router.get('/login', function (req, res) {
    var form;
    form = req.body;
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
            var test = bcrypt.compare(form.password, results[0].password);
            if (test) {
                console.log(test);
                var session = auth.createSession(results[0]);
                session.user.password = null;
                res.json(session);
                res.end();
            }
            else if (!test) {
                var data = {
                    user: '',
                    response: "password is incorrect!!!!"
                };
                res.json(data);
                res.end();
            }
        }
        else {
            var data = {
                user: '',
                response: "email is incorrect!!!!"
            };
            res.json(data);
            res.end();
        }
    });
});
module.exports = router;
//# sourceMappingURL=accounts.js.map