"use strict";
exports.__esModule = true;
var debug = require("debug");
var express = require("express");
require('./routes/config').rootDir = __dirname;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var books = require('./routes/books');
var blog = require('./routes/blog');
var BLOG_API = require('./routes/api/blog');
var UTIL_API = require('./routes/api/util');
var SOCIAL_API = require('./routes/api/social');
var ACCOUNTS_API = require('./routes/api/accounts');
var HOME_API = require('./routes/api/home');
var routes = require('./routes/index');
var users = require('./routes/users');
var social = require('./routes/social');
var app = express();
var port = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/blog', BLOG_API);
app.use('/api/util', UTIL_API);
app.use('/api/accounts', ACCOUNTS_API);
app.use('/api/social', SOCIAL_API);
app.use('/api/home', HOME_API);
app.use('/secure', users);
app.use('/lib', books);
app.use('/blog', blog);
app.use('/social', social);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/pages/home.html');
});
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/pages/accounts/login.html');
});
app.get('/register', function (req, res) {
    res.sendFile(__dirname + '/pages/accounts/register.html');
});
app.get('/profile', function (res) {
    res.sendFile(__dirname + '/profile.html');
});
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.set('port', port);
var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address());
});
//# sourceMappingURL=app.js.map