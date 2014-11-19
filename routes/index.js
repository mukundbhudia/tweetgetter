var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var twitterKeys = req.app.get('twitterkeys');
	if (twitterKeys && (req.app.get('authenticated') == true) ) {
		//If the keys are working we pass the user to the instructions page so they can begin searching for tweets
		var baseUrl = req.protocol + '://' + req.get('host') + "/";
    	var tweetUrl = baseUrl + "tweets";
    	var twitterUser = req.app.get('twitterUser');
		res.render('userkeys', {title: 'Welcome @' + twitterUser +', your Twitter API keys have been found and loaded', keys: JSON.stringify(twitterKeys), userTweetUrl: tweetUrl});
	} else {
		//The keys have not been accepted so we instruct the user to manually enter them using the form
		res.render('index', { title: 'TweetGetter' });
	}
	
});

module.exports = router;
