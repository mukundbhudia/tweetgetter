var express = require('express');
var router = express.Router();
var auth = require('../auth');

/* GET home page. */
router.post('/', function(req, res, next){    
    var postData = req.body;
    var baseUrl = req.protocol + '://' + req.get('host') + "/";
    var tweetUrl = baseUrl + "tweets";

    if(postData) {
    	req.app.set('twitterkeys', postData);
    	console.log("User has submitted keys");
        auth.twitterAuthenticator(postData, function(result, twitterName){
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
