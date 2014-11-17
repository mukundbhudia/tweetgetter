var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var twitterKeys = req.app.get('twitterkeys');
	
	if (twitterKeys && (req.app.get('authenticated') == true) ) {
		var baseUrl = req.protocol + '://' + req.get('host') + "/";
    	var tweetUrl = baseUrl + "tweets";
		res.render('userkeys', {title: 'Keys file found and loaded', keys: JSON.stringify(twitterKeys), userTweetUrl: tweetUrl});
	} else {
		res.render('index', { title: 'TweetGetter' });
	}
	
});

module.exports = router;
