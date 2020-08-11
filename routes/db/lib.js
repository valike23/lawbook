"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var config_1 = require("../config");
var mysql_1 = require("mysql");
var libDatabase = (function () {
    function libDatabase(uri, name) {
        this.uri = uri;
        this.name = name;
        this.difference = 10;
        this.connection = mysql_1.createConnection(config_1.dbFree);
    }
    libDatabase.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            mongodb_1.MongoClient.connect(_this.uri).then(function (mongoClient) {
                _this.client = mongoClient;
                resolve(mongoClient);
            }, function (error) {
                reject(error);
            });
        });
    };
    libDatabase.prototype.errorHandler = function (res, error) {
        res.status(503);
        res.json(error.message);
        console.log(error);
    };
    libDatabase.prototype.sqlErrorHandler = function (res, error) {
        res.status(503);
        res.json(error.message);
        console.log(error);
    };
    libDatabase.prototype.createPost = function (res, book) {
        var query = "INSERT INTO book set ? ";
        this.connection.query(query, book, function (err, result) {
            if (err) {
                res.status(503);
                res.json(err.message);
                console.log(err);
                return;
            }
            res.json(result);
            res.end();
        });
    };
    libDatabase.prototype.retrieveBook = function (res, type) {
        var query = "select * from book where type ='" + type + "'";
        this.connection.query(query, function (err, result) {
            if (err) {
                res.status(503);
                res.json(err.message);
                console.log(err);
                return;
            }
            res.json(result);
            res.end();
        });
    };
    libDatabase.prototype.createIndexFavorite = function (res) {
    };
    return libDatabase;
}());
exports["default"] = libDatabase;
//# sourceMappingURL=lib.js.map