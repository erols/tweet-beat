const express = require('express');
const http = require('http');
const url = require('url');
<<<<<<< HEAD
const WebSocket = require('ws');
const Twitter = require('twitter');

// replace with valid keys. I will supply on the day. These are not valid anymore
var Twitter = require('twitter');

var client = new Twitter({
>>>>>>> Changes to webserver
  consumer_key: 'himWvvF8H5Cj9igkvsRoZKqil',
  consumer_secret: '4eubxtfYtLzpTRSCUzxIiyF96bjb3wTxJrjCMR6n8a4ssZ51J7',
  access_token_key: '847758088610484224-EbwFm1ndzkKWFUNkSNgOwQDKrETT09D',
  access_token_secret: 'uP7cIiSfab38V7HwHEbSm17mcKDODlbHuvL4SyrL68lDU'
});
 
const params = {track: '@tweet_beat99'};

console.log('after new Twitter');

var params = {track: '@tweet_beat99'};
const app = express();

app.use(express.static('public'))

var server = http.createServer(function (request, response) {
  console.log("request!");
  response.writeHead(200, {"Content-Type": "application/json"});
  client.get('statuses/mentions_timeline.json', {}).then(function (tweet) { response.end(JSON.stringify(tweet))  }).catch( function (error) { response.end("ERROR" + error); console.log(error) } );
});


server.listen(8081, function listening() {
  console.log('Listening on %d', server.address().port);
});
