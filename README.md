tweetgetter
===========

A nodejs app that obtains tweets for a given Twitter user

You will need to create a Twitter App and have node installed.

To created a Twitter app, 
- Visit https://apps.twitter.com, log-in and then click 'Create New App'.
- Fill out the details and submit the form.
- On the 'Keys and Access tokens' tab click 'Create my access token'.
- The keys will be generated and you now have the four keys necessary to run tweetgetter.

Once installed, execute using "node ./bin/www". Naviagte to http://localhost:3000/ and enter the consumer and access keys for your twitter app account.
The keys include:
- Consumer key
- Consumer secret
- Access token key
- Access token secret

Alternatively you can create the file 'keys.json' in the root directory of the project with the consumer and access keys in JSON form like the following:

{"consumer_key":"******",
"consumer_secret":"******",
"access_token_key":"******",
"access_token_secret":"******"}

Once these have been entered you may visit the url http://localhost:3000/tweets/[twitteruser]/[numberOfTweets] to display tweets. Where [twitteruser] is the twitter user name and [numberOfTweets] is the number of tweets to display for the given username.

To return tweets in bullet point list form you can use the query parameter ?out=list like so: http://localhost:3000/tweets/[twitteruser]/[numberOfTweets]?out=list. Otherwise the default form for the result would be in JSON form.

For example, the URL for the last 15 tweets for the user @bbcweather would be http://localhost:3000/tweets/bbcweather/15/ in JSON form. 

And for a bullet point list form for @bbcweather the URL would be: http://localhost:3000/tweets/bbcweather/15?out=list.
