var express = require('express');
var router = express.Router();

var util = require('util'),
    twitter = require('twitter');

var screenName;
var numberOfTweets;

router.get('/:screen_name/:tweetCount', function(req, res, next) {

	var twitterkeys = req.app.get('twitterkeys');
	var twit = new twitter(twitterkeys);
	var tweetData;
	var tweets = [];
	var tweetString = "<ul>";
	var baseUrl = req.protocol + '://' + req.get('host') + "/";

	if (twitterkeys) {
		screenName = req.params.screen_name;
		numberOfTweets = req.params.tweetCount;
		console.log("Looking for " + numberOfTweets + " tweets from @" + screenName + "...");

		twit.get('/statuses/user_timeline.json', {screen_name:screenName, count:numberOfTweets, include_entities:true}, function(data, twitres) {

			tweetData = data;
		
			if (tweetData && twitres.statusCode == 200 && tweetData.length > 0) {
				for (var i = 0; i < tweetData.length; i++){
					tweets.push(tweetData[i]['text']);
					tweetString += "<li>" + tweetData[i]['text'] + "</li>";
				}

				console.log("Found " + tweets.length + " tweets from @" + screenName);
				res.send(tweetString + "</ul>");

			} else if (tweetData.length == 0) {
				console.log("No tweets found from @" + screenName);
				res.send("@" + screenName + " has not tweeted yet.");

			} else if (twitres.statusCode == 404) {
				console.error("No results found");
				res.send("Opps! There were no tweets found for @" + screenName + ". Please try again: " + baseUrl);

			} else {
				console.error("Twitter retreival failure");
				res.send("Opps! It seems we cannot retreive twitter data. Have you submitted your Twitter API consumer and access keys? Please try again: " + baseUrl);
			}	
		});

	} else {
		res.send("Opps! It seems your twitter keys are blank. Please try again: " + baseUrl);
	}

});

module.exports = router;
