require("replup").config();
const axios = require('axios');
const Twit = require('twit');

// Initialize the API
const T = new Twit({
  consumer_key: process.env['api'],
  consumer_secret: process.env['secret'],
  access_token: process.env['access_token'],
  access_token_secret: process.env['access_token_secret']
});

function start(){
  // Questions
axios.get('https://opentdb.com/api.php?amount=1&type=multiple')
  .then(response => {
    let que = response.data.results[0]. question;
    let ans = response.data.results[0].correct_answer;
    let category = response.data.results[0].category;
    postTweet(que,ans,category);
  })
  .catch(error => {
    console.log(error);
  });
}
  
// Function to post a tweet
function postTweet(que,ans,category) {
let post = `#${category} \n\n #Question: ${que} \n\n Answer: ${ans}`;
  T.post('statuses/update', { status: post }, (err, data, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Tweet posted successfully!');
    }
  });
}

// Post a tweet every 1 hour (3600000 milliseconds)
setInterval(start,30000);


