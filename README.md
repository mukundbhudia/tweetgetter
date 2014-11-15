tweetgetter
===========

A nodejs app that obtains tweets for a given Twitter user

You will need to create a Twitter App and have node installed.

Once installed, execute using "node ./bin/www". Naviagte to http://localhost:3000/ and enter the consumer and access keys for your twitter app account.
The keys include:
- Consumer key
- Consumer secret
- Access token key
- Access token secret

Once these have been entered you may visit the url http://localhost:3000/tweets/[twitteruser]/[numberOfTweets] to display tweets. Where [twitteruser] is the twitter user name and [numberOfTweets] is the number of tweets to display for the given username.

For example, the URL for the last 15 tweets for the user @bbcweather would be http://localhost:3000/tweets/bbcweather/15/.
