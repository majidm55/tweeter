// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */
$(document).ready(function() {
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

loadTweets();
function renderTweets(tweets) {
  var tweetContainer = $('.tweet-container')
  tweetContainer.empty();
  for(tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    tweetContainer.prepend($tweet);

  }
}

function createTweetElement(tweetData) {
  // access userdata from our database object
  let {user, content ,created_at} = tweetData;
  let {name, avatars, handle} = user;
  let {text} = content;
  let src = avatars.regular

  // create dom elements///
  $tweet = $("<article>").addClass("tweet");
  $header = $("<header>");
  $img = $("<img>").attr("src",src);
  $h3 = $("<h3>").text(name);
  $h6 = $("<h6>").text(handle);
  $content = $("<content>")
  $p1 = $("<p>").text(text);
  $footer = $("<footer>");
  $p2 = $("<p>").text(created_at);
  $icons = $("<div>").addClass("icons");
  $iconFlag = $(`<i class="fas fa-flag"></i>`);
  $iconTweet = $(`<i class="fas fa-retweet"></i>`);
  $iconHeart = $(`<i class="fas fa-heart"></i>`);

  // appending items together

  $header.append($img);
  $header.append($h3);
  $header.append($h6);
  $content.append($p1);
  $footer.append($p2);
  $icons.append($iconFlag);
  $icons.append($iconTweet);
  $icons.append($iconHeart);
  $footer.append($icons);
  $tweet.append($header);
  $tweet.append($content);
  $tweet.append($footer);

  return $tweet;
}



function postingData() {
  $form = $('.new-tweet form');
  $form.submit(function (event) {
    event.preventDefault();
    console.log('Button clicked, performing ajax call...');

    let tweetLength = $('.new-tweet textarea').val().length

    if (tweetLength > 140) {
      return alert("Exceeded character limit")
    }
    if (!tweetLength){
      return alert("Invalid input")
    }

    $.post( "/tweets", $form.serialize(), loadTweets );
    console.log("newtweet!!!",$form)
  });

};
postingData();

function loadTweets() {
  $.get( "/tweets", function( data ) {
    renderTweets(data);
  });
};
loadTweets();


});