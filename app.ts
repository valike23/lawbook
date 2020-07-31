import * as debug from 'debug';
import * as express from 'express';
require('./routes/config').rootDir = __dirname;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var books = require('./routes/books');
var blog = require('./routes/blog');
const BLOG_API = require('./routes/api/blog');
const UTIL_API = require('./routes/api/util');
const SOCIAL_API = require('./routes/api/social');
const ACCOUNTS_API = require('./routes/api/accounts');
const HOME_API = require('./routes/api/home');
var routes = require('./routes/index');
var users = require('./routes/users');
var social = require('./routes/social');

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
app.use('/api/blog', BLOG_API);
app.use('/api/util', UTIL_API);
app.use('/api/accounts', ACCOUNTS_API);
app.use('/api/home', HOME_API);
app.use('/secure', users);
app.use('/lib', books);
app.use('/blog', blog);
app.use('/social', social);

app.get('/', function (req: express.Request, res: express.Response) {
    res.sendFile(__dirname + '/pages/home.html');
});

app.get('/login', function (req: express.Request, res: express.Response) {
    res.sendFile(__dirname + '/pages/accounts/login.html');
});

app.get('/register', function (req: express.Request,  res: express.Response) {
    res.sendFile(__dirname + '/pages/accounts/register.html');
});
app.get('/profile', function ( res: express.Response) {
    res.sendFile(__dirname + '/profile.html');
});


// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    var err = new Error('Not Found');
    
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function  (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    
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
