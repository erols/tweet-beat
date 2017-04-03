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

var ws = new WebSocket('ws://localhost:8081');
ws.onmessage = function (event) {
    console.log(event.data);
    addTweet(event.data);
    var parsed = parseTextToAudioParams(event.data);
    playNotes(parsed, note_index, audioCtx);
};


var A = 65, B = 122, C = 100, D = 1000, E = 110, F = 1760;
//var ar_A = 0, ar_B = 65535;

var synthTypes = {
 "sine": true,
 "square": true,
 "sawtooth": true,
 "triangle": true
};

function parseTextToAudioParams(tweetText) {

 function computeValues(tweetChar, synth) {
    console.log(synth);
   let pitch, duration;
   let X = tweetChar.charCodeAt(0);
   // if (tweetChar != " ") {
   //   X = (X-ar_A)/(ar_B-ar_A) * (B-A) + A;
   // }

   if (tweetChar >= "A" && tweetChar <= "z") {
     duration = (X-A)/(B-A) * (D-C) + C;
     pitch = (X-A)/(B-A) * (F-E) + E;
   } else {
     duration = Math.abs((X-A)/(B-A) * (D-C) + C);
     pitch = 0;
   }
   return { "pitch": pitch, "duration": duration, "originalCharacter": tweetChar, "charCode": X, "synthType": synth};
 }

 var audioParams = {
   notes : []
   //synthType: "sine"
 }

 let synth = "sine";
 var i = 0;
 while (i < tweetText.length) {

   if (tweetText[i] == "#") {
     let hashTag = tweetText.slice(i+1, tweetText.indexOf(" ", i));
     if (synthTypes[hashTag]) {
       synth = hashTag;
     }
     i += hashTag.length + 1;
     continue;
   }
   let values = computeValues(tweetText[i], synth);
   audioParams.notes.push(values)

   i++;
 }

 return audioParams;
}