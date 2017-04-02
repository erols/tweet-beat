const MAX_TWEETS = 10;

// let ws = new WebSocket('ws://hyf-tweet.ddns.net');
// ws.onmessage = function (event) {
//     console.log('tweet received');
//     addTweet(event.data.substring(14));
// };

function addTweet(tweet) {
    let tweetList = $('#tweetList');
    console.log(tweetList.children().length);
    if (tweetList.children().length > MAX_TWEETS) {
        console.log('removing')
        tweetList.children().first().remove();
    }
    let li = $(`<li class="list-group-item">${tweet}</li>`);
    tweetList.append(li);
}

$.getJSON('http://hyf-tweet.ddns.net')
    .then(tweets => {
        tweets.forEach(tweet => {
            console.log(tweet.text);
            addTweet(tweet.text);
        })
    });