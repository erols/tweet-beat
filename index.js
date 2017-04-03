const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
var Twitter = require('twitter');
const conf = require('./config.json');

// replace with valid keys. I will supply on the day. These are not valid anymore
var client = new Twitter(conf);
/*var client = new Twitter({
  consumer_key: 'himWvvF8H5Cj9igkvsRoZKqil',
  consumer_secret: '4eubxtfYtLzpTRSCUzxIiyF96bjb3wTxJrjCMR6n8a4ssZ51J7',
  access_token_key: '847758088610484224-EbwFm1ndzkKWFUNkSNgOwQDKrETT09D',
  access_token_secret: 'uP7cIiSfab38V7HwHEbSm17mcKDODlbHuvL4SyrL68lDU'
});*/

var params = {track: '@tweet_beat99'};
client.stream('statuses/filter', params, function(stream) {
  stream.on('data', function (data) {
  	var tweet_text = data['text'].substring(data['text'].indexOf(" ") + 1);
  	console.log(tweet_text);
  	wss.broadcast(tweet_text);
  });
});

const app = express();

app.use(express.static('public'))

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

server.listen(8081, function listening() {
  console.log('Listening on %d', server.address().port);
});
