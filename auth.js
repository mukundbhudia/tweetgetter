var express = require('express');
var util = require('util'),
    twitter = require('twitter');

module.exports = {
    twitterAuthenticator: function(twitterKeys, callback) {

        var twit = new twitter(twitterKeys);
        twit.verifyCredentials(function(data) {

            if (data.statusCode === 401) {
                console.error("Authentication failure. The keys provided have not been authorised.");
                callback && callback(false);

            } else if (data.statusCode === 400) {
                console.error("Authentication failure. Bad request, possible blank keys entered.");
                callback && callback(false);

            } else if (data.screen_name) {
                console.log("User @" + data.screen_name + " authenticated.");
                callback && callback(true, data.screen_name);
            } else {
                throw new Error("Connection with Twitter cannot be established");
            }
        });
    }
};