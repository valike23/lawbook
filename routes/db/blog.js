"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var BlogDatabase = (function () {
    function BlogDatabase(uri, name) {
        this.uri = uri;
        this.name = name;
        this.difference = 10;
    }
    BlogDatabase.prototype.connect = function () {
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
    BlogDatabase.prototype.createBlog = function (res, blog) {
        var _this = this;
        this.connect().then(function (data) {
            var name = _this.name;
            var dbo = data.db(name);
            dbo.collection("blog").insertOne(blog, function (err, resd) {
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
    BlogDatabase.prototype.getTopBlogs = function (res, page) {
        var _this = this;
        this.connect().then(function (data) {
            var name = _this.name;
            var dbo = data.db(name);
            dbo.collection("blog").find({}, { projection: { "content": 0 } })
                .sort({ rate: -1 }).skip(((page - 1) * _this.difference))
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
    BlogDatabase.prototype.getAllBlogs = function (res, page) {
        var _this = this;
        this.connect().then(function (data) {
            var name = _this.name;
            var dbo = data.db(name);
            dbo.collection("blog").find({}, { projection: { "content": 0 } })
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
    BlogDatabase.prototype.getContent = function (res, id) {
        var _this = this;
        this.connect().then(function (data) {
            var name = _this.name;
            var OBJECT_ID = new mongodb_1.ObjectId(id);
            console.log(OBJECT_ID);
            var newvalues = { $inc: { views: 1 } };
            var dbo = data.db(name);
            var myBlog;
            dbo.collection("blog").findOneAndUpdate({ '_id': OBJECT_ID }, newvalues).then(function (result) {
                myBlog = result.value;
                res.json(myBlog);
                res.end();
                _this.updateRate(myBlog, data, OBJECT_ID);
            }, function (err) {
                _this.errorHandler(res, err);
            });
        }, function (err) {
            _this.errorHandler(res, err);
        });
    };
    BlogDatabase.prototype.getFavoritesBlog = function (res, id) {
        var _this = this;
        this.connect().then(function (data) {
            var name = _this.name;
            var dbo = data.db(name);
            console.log("entered");
            dbo.collection('favorites').find({}).toArray().then(function (results) {
                console.log(results);
                res.json(results);
                res.end();
            }, function (err) {
                _this.errorHandler(res, err);
            });
        });
    };
    BlogDatabase.prototype.createIndexFavorite = function (res) {
    };
    BlogDatabase.prototype.updateRate = function (blog, db, OBJECT_ID) {
        var name = this.name;
        var dbo = db.db(name);
        blog.views = blog.views + 1;
        var timeDifference = (new Date().getTime() - blog.createdDate.getTime()) / 1000 * 3600;
        blog.rate = (blog.views * 1000) / timeDifference;
        console.log(blog.rate);
        dbo.collection("blog").findOneAndUpdate({ '_id': OBJECT_ID }, {
            $set: {
                rate: blog.rate
            }
        }).then(function (result) {
            console.log(result);
        }, function (err) {
            console.log(err);
        });
    };
    BlogDatabase.prototype.errorHandler = function (res, error) {
        res.status(503);
        res.json(error.message);
        console.log(error);
    };
    return BlogDatabase;
}());
exports["default"] = BlogDatabase;
//# sourceMappingURL=blog.js.map