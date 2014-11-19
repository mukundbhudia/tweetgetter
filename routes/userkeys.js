var express = require('express');
var router = express.Router();
var auth = require('../auth');

/* POST userkeys route. This is visited when the API keys form from the index page is posted */
router.post('/', function(req, res, next){    
    var postData = req.body;
    var baseUrl = req.protocol + '://' + req.get('host') + "/";
    var tweetUrl = baseUrl + "tweets";  //In case something goes wrong the URL to access tweets is formed for easy user access

    if(postData) {
    	req.app.set('twitterkeys', postData);
    	console.log("User has submitted keys");
        auth.twitterAuthenticator(postData, function(result, twitterName){  //Need to authenticate posted keys
            req.app.set('authenticated', result);
            if (result == true) {
                req.app.set('twitterUser', twitterName);
                res.render('userkeys', {title: 'Welcome @' + twitterName +', your keys have been accepted', keys: JSON.stringify(postData), userTweetUrl: tweetUrl});
            } else {
                res.render('index', { title: 'TweetGetter', infoMessage: "Authentication failure. The keys provided have not been authorised, please try again." });
            }
        });
	    
    } else {
        req.app.set('authenticated', false);
    	res.send("Opps! Something went wrong please try again: " + baseUrl);
    }

});

module.exports = router;
