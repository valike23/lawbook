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
var connection = mysql.create.connection({
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
    var user = req.param.username;
    console.log(user);
    connection.query("")

})

module.exports = router;
