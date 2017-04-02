const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const Twitter = require('twitter');

// replace with valid keys. I will supply on the day. These are not valid anymore
<<<<<<< HEAD
const client = new Twitter({
  consumer_key: 'himWvvF8H5Cj9igkvsRoZKqil',
  consumer_secret: '4eubxtfYtLzpTRSCUzxIiyF96bjb3wTxJrjCMR6n8a4ssZ51J7',
  access_token_key: '847758088610484224-EbwFm1ndzkKWFUNkSNgOwQDKrETT09D',
  access_token_secret: 'uP7cIiSfab38V7HwHEbSm17mcKDODlbHuvL4SyrL68lDU'
});
 
const params = {track: '@tweet_beat99'};
=======
var client = new Twitter({
  consumer_key: '	5nrHSgmHbRdrJ5iG1MJodFrLb',
  consumer_secret: 'Ai8Jor9FCySFdnWnVpv6NxQRjORicaJLshtk8tKwlMAsGIZJ3I',
  access_token_key: '50592557-t0x3wy6GetznAoYY7ak7EYqaZ8kapjIW6BAdwB86j',
  access_token_secret: 'l3tSMfKRSH8PbbbxZpoI5Hy2DoVP2M3iPeWTUz66rUyJ6'
});
 
console.log('after new Twitter');

var params = {track: '@tweet_beat99'};
>>>>>>> 398ba4bf680c508be3613ab13bf9dd7f782b2aaf
client.stream('statuses/filter', params, function(stream) {
  stream.on('data', function (data) {
  	console.log(data.user.name);
  	console.log(data['text']);
/*  	var tweet_data = {
  		'text': data.text,
  		'author': data.user.name
  	};
  	console.log(tweet_data)*/
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
