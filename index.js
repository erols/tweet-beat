const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
var Twitter = require('twitter');

// replace with valid keys. I will supply on the day. These are not valid anymore
var client = new Twitter({
  consumer_key: '	5nrHSgmHbRdrJ5iG1MJodFrLb',
  consumer_secret: 'Ai8Jor9FCySFdnWnVpv6NxQRjORicaJLshtk8tKwlMAsGIZJ3I',
  access_token_key: '50592557-t0x3wy6GetznAoYY7ak7EYqaZ8kapjIW6BAdwB86j',
  access_token_secret: 'l3tSMfKRSH8PbbbxZpoI5Hy2DoVP2M3iPeWTUz66rUyJ6'
});
 
console.log('after new Twitter');

var params = {track: '@tweet_beat99'};
client.stream('statuses/filter', params, function(stream) {
  stream.on('data', function (data) {
  	console.log(data['text']);
  	wss.broadcast(data['text']);
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
