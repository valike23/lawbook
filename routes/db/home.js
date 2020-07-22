"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var HomeDatabase = (function () {
    function HomeDatabase(uri, name) {
        this.uri = uri;
        this.name = name;
        this.difference = 10;
    }
    HomeDatabase.prototype.connect = function () {
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
    HomeDatabase.prototype.addPersonalities = function (res, personalities) {
        var _this = this;
        this.connect().then(function (data) {
            var name = _this.name;
            for (var index = 0; index < personalities.length; index++) {
                personalities[index].createdDate = new Date();
            }
            var dbo = data.db(name);
            dbo.collection("personalities").insertMany(personalities, function (err, resd) {
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
    HomeDatabase.prototype.getPersonalities = function (res) {
        var _this = this;
        this.connect().then(function (data) {
            var name = _this.name;
            var dbo = data.db(name);
            dbo.collection("personalities").find({}).toArray().then(function (result) {
                res.json(result);
                res.end();
            }, function (err) {
                _this.errorHandler(res, err);
            });
        });
    };
    HomeDatabase.prototype.errorHandler = function (res, error) {
        res.status(503);
        res.json(error.message);
        console.log(error);
    };
    return HomeDatabase;
}());
exports.HomeDatabase = HomeDatabase;
exports["default"] = HomeDatabase;
//# sourceMappingURL=home.js.map