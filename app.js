﻿'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);
app.use('/secure', users);

app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/pages/home.html');
})
app.get('/lib', function (req, res, next) {
    res.sendFile(__dirname + '/pages/lib.html');
})
app.get('/lib/books', function (req, res, next) {
    res.sendFile(__dirname + '/pages/lib/books.html');
})
app.get('/login', function (req, res, next) {
    res.sendFile(__dirname + '/login.html');
});
app.get('/lib/books/details', function (req, res, next) {
    res.sendFile(__dirname + '/pages/lib/details.html');
});
app.get('/register', function (req, res, next) {
    res.sendFile(__dirname + '/register.html');
});
app.get('/blog', function (req, res, next) {
    res.sendFile(__dirname + '/blog.html');
});
app.get('/profile', function (req, res, next) {
    res.sendFile(__dirname + '/profile.html');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', port);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
   
});
