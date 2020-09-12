"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var socialDatabase = (function () {
    function socialDatabase(uri, name) {
        this.uri = uri;
        this.name = name;
        this.difference = 10;
    }
    socialDatabase.prototype.connect = function () {
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
    socialDatabase.prototype.createPost = function (res, post) {
        var _this = this;
        this.connect().then(function (data) {
            var name = _this.name;
            var dbo = data.db(name);
            dbo.collection("post").insertOne(post, function (err, resd) {
                if (err) {
                    res.status(503);
                    res.json(err.message);
                    console.log(err);
                    return;
                }
                res.json(resd);
                res.end();
            });
        }, function (err) {
            console.log(err);
        });
    };
    socialDatabase.prototype.createIndexFavorite = function (res) {
    };
    socialDatabase.prototype.getAllPosts = function (res, page) {
        var _this = this;
        this.connect().then(function (data) {
            var name = _this.name;
            console.log("look out");
            var dbo = data.db(name);
            dbo.collection("post").find({})
                .sort({ createdDate: -1 })
                .skip(((page - 1) * _this.difference))
                .limit(5).toArray(function (err, result) {
                if (err) {
                    _this.errorHandler(res, err);
                    return;
                }
                res.json(result);
                res.end();
            });
        }, function (err) {
            _this.errorHandler(res, err);
        });
    };
    socialDatabase.prototype.errorHandler = function (res, error) {
        res.status(503);
        res.json(error.message);
        console.log(error);
    };
    return socialDatabase;
}());
exports["default"] = socialDatabase;
//# sourceMappingURL=social.js.map