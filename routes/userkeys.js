var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next){    
    var postData = req.body;
    var baseUrl = req.protocol + '://' + req.get('host') + "/";
    var tweetUrl = baseUrl + "tweets";

    if(postData) {
    	req.app.set('twitterkeys', postData);
    	console.log("User has submitted keys");
        req.app.set('authenticated', true); //TODO: this is an assumption at the moment must authenticated posted keys too
	    res.render('userkeys', {title: 'Keys submitted', keys: JSON.stringify(postData), userTweetUrl: tweetUrl});
    } else {
        req.app.set('authenticated', false);
    	res.send("Opps! Something went wrong please try again: " + baseUrl);
    }

});

module.exports = router;
