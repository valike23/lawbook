'use strict';
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var auth = require('./auth');
const util = require('../utils/utils')
var multer = require('multer');
var fs = require('fs');
var filename;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/profile');
    },
    filename: function (req, file, cb) {
        filename = "profile" + "-" + Date.now();
        cb(null, filename);
    }
})
router.use(function (req, res, next) {

    let authen = auth.isAuth(req.headers.token);
    if (authen) {
        req.authen = authen;
        next();
    }
    else {
        res.status(402);
        res.json("you are not logged in");
        res.end();
        return;
    }
})



var connection = mysql.createConnection(util.db);


/* GET users listing. */
router.get('/', function (req, res) {
    res.json(auth.sessions);
    res.end();
});

router.post("/uploadpics", function (req, res) {

    var authen = req.authen;
    console.log('auten',authen);
    var base = 'images/profile/profile.png';
   
  
        if (!(authen.user.dp == base)) {
            console.log("delete");

            let mybase = './public/' + authen.user.dp;
            try {
                if (fs.existsSync(mybase)) {
                    try {
                        fs.unlinkSync(mybase)
                        //file removed
                    } catch (err) {
                        console.error(err);
                        res.status(502);
                        res.json("delete failed, try again later");
                        res.end();
                    }
                }
            } catch (err) {
                console.error(err)
            }
           
        }
        var upload = multer({ storage: storage }).single('file');
        upload(req, res, function (err) {
            if (err) {
                console.log(err)
                return res.end("Error uploading file.");
            }

            let address = 'images/profile/' + filename;
            authen.user.dp = address;
            let query = "update user set dp = '" + address + "' where id = " + authen.user.id;
            connection.query(query, function (err, results) {
                if (err) {
                    console.log(err);
                    res.end();
                }
                let test = auth.update(authen);
                if (test) {
                    res.json(authen);
                    res.end();
                }
                else {
                    res.status(401);
                    res.end();
                }

            });

        });
    
  
   
})
router.put("/update", function (req, res) {
    var edit = req.body;
    var authen = req.authen;
    console.log(edit);
   
    let query = "update user set `" + edit.holder + "`= '" + edit.value + "' where id =" + authen.user.id;
    connection.query(query, function (err, results) {
        if (err) {
            res.status(501);
            res.json("error updating try again later");
            res.end();
        }
        for (var key in authen.user) {
            if (key == edit.holder) {
                authen[key]= edit.value;
                console.log(authen);
           console.log(auth.update(authen));
                break;
            }
        }
        res.json("update successful");
        res.end();
    })
})









module.exports = router;
