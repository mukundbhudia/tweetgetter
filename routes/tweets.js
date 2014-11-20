var express = require('express');
var router = express.Router();

var util = require('util'),
    twitter = require('twitter');

var screenName;	//This is the Twitter username e.g. @bbcweather
var numberOfTweets;

/* GET tweets route. Visiting this route will result in a list of tweets. */
router.get('/:screen_name/:tweetCount', function(req, res, next) {

	var twitterkeys = req.app.get('twitterkeys');
	var twit = new twitter(twitterkeys);
	var tweetData;	//The data returned by Twitter (in JSON)
	var tweets = [];
	var tweetString = "<ul>";	//The app will return tweets as a list
	var baseUrl = req.protocol + '://' + req.get('host') + "/"; // The url that the app is running from

	if (twitterkeys && (req.app.get('authenticated') == true)) {
		screenName = req.params.screen_name;
		numberOfTweets = req.params.tweetCount;
		tweetsOutput = req.query.out; //The user can request the tweets to be outputted in a particular form
		console.log("Looking for " + numberOfTweets + " tweets from @" + screenName + "...");

		twit.get('/statuses/user_timeline.json', {screen_name:screenName, count:numberOfTweets, include_entities:true}, function(data, twitres) {

			tweetData = data;
		
			if (tweetData && twitres.statusCode == 200 && tweetData.length > 0) {
				for (var i = 0; i < tweetData.length; i++){
					//We go through each tweet...
					tweets.push(tweetData[i]['text']);
					tweetString += "<li>" + tweetData[i]['text'] + "</li>"; //...and form it as a list element
				}
				console.log("Found " + tweets.length + " tweets from @" + screenName);
				//Check to see if the user has requested a specific output
				if (tweetsOutput == "list") {
					console.log("Output query found. Outputting tweets in " + tweetsOutput + " form.");
					res.send(tweetString + "</ul>");
				} else {
					//Default view of tweets for no output paramaters specified
					res.json({tweets: tweets});					
				}
				

			} else if (tweetData.length == 0) {
				console.log("No tweets found from @" + screenName);
				res.send("@" + screenName + " has not tweeted yet.");

			} else if (twitres.statusCode == 404) {
				//404 status could be when a user does not exist
				console.error("No results found");
				res.send("Opps! There were no tweets found for @" + screenName + ". Please try again: " + baseUrl);

			} else {
				// TODO: This may not be needed
				console.error("Twitter retreival failure");
				res.send("Opps! It seems we cannot retreive twitter data. Have you submitted your Twitter API consumer and access keys? Please try again: " + baseUrl);
			}	
		});

	} else {
		res.send("Opps! It seems your Twitter API keys have been unauthorised or are blank. Please try again: " + baseUrl);
	}

});

module.exports = router;
