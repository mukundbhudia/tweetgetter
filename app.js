var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var tweets = require('./routes/tweets');
var userkeys = require('./routes/userkeys');
var auth = require('./auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/tweets', tweets);
app.use('/userkeys', userkeys);

var util = require('util'),
    twitter = require('twitter');
app.set('authenticated', false);

var keysFileName = "keys.json"      //The name of the Twitter API keys JSON file
//When the app is loaded we look for the Twitter API keys file to autmatically authenticate a user
fs = require('fs')
fs.readFile(keysFileName, 'utf8', function (err, data) {

    if (err && (err.errno == 34)) {         //34 is file not found error
        app.set('authenticated', false);    //File not found error, still unauthenticated
        return console.log("Keys file '" + keysFileName + "' not found. Manual authentication required.");

    } else if (err && (err.errno != 34)) {  //Another file error has occured
        app.set('authenticated', false);    //Still unable to authenticate
        return console.log(err);

    } else {
        try {
            JSON.parse(data);   //Attempt to Parse as JSON
            app.set('twitterkeys', JSON.parse(data));
            console.log("Keys file '" + keysFileName + "' found and loaded. Attempting Twitter authentication...");

            var twitterkeys = app.get('twitterkeys');
            auth.twitterAuthenticator(twitterkeys, function(result, twitterName){
                app.set('twitterUser', twitterName);    //Authentication performed and variabled set
                app.set('authenticated', result);
            });        
        } catch (error) {
            console.error(error);
            app.set('authenticated', false);
            return console.error("Keys file '" + keysFileName + "' found but is not in JSON form");
        }
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


module.exports = app;
