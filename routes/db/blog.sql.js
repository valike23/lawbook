"use strict";
exports.__esModule = true;
var mysql_1 = require("mysql");
var config_1 = require("../config");
var common_1 = require("./common");
var BlogSQL = (function () {
    function BlogSQL() {
        this.connection = mysql_1.createConnection(config_1.localDb);
    }
    BlogSQL.prototype.addToShelf = function (res, blogShelf) {
        var query = "INSERT INTO blog_shelf set ? ";
        common_1.queryInsert(res, query, this.connection, blogShelf);
    };
    BlogSQL.prototype.retrieveFromShelf = function (res, blog_id, user_id) {
        var query = "select * from blog_shelf where blog_id = '" + blog_id + "' and user_id = " + user_id;
        common_1.queryUpdateAndSelect(res, query, this.connection);
    };
    BlogSQL.prototype.retrieveAllFromShelf = function (res, user_id) {
        var query = "select * from blog_shelf where user_id = " + user_id;
        common_1.queryUpdateAndSelect(res, query, this.connection);
    };
    BlogSQL.prototype.removeFromFavorite = function (res, blog_id, user_id) {
        var query = "delete from blog_shelf where blog_id = '" + blog_id + "' and user_id = " + user_id;
        common_1.queryUpdateAndSelect(res, query, this.connection);
    };
    return BlogSQL;
}());
exports["default"] = BlogSQL;
//# sourceMappingURL=blog.sql.js.map