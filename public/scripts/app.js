// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */
$(document).ready(function() {


loadTweets();
//toggle compose button//
$("#nav-bar button").on('click',(function(){
  $(".new-tweet").slideToggle("slow");
  $(".new-tweet textarea").focus();
}));

function timeSince(date) {
 var seconds = Math.floor((new Date() - date) / 1000);
 var interval = Math.floor(seconds / 31536000);
 if (interval >= 1) {
     return interval + " years ago";
 }
 interval = Math.floor(seconds / 2592000);
 if (interval >= 1) {
     return interval + " months ago";
 }
 interval = Math.floor(seconds / 86400);
 if (interval >= 1) {
     return interval + " days ago";
 }
 interval = Math.floor(seconds / 3600);
 if (interval >= 1) {
     return interval + " hours ago";
 }
 interval = Math.floor(seconds / 60);
 if (interval >= 1) {
     return interval + " minutes ago";
 }
 return Math.floor(seconds + 1) + " seconds ago";
}


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
  $p2 = $("<p>").text(timeSince(created_at));
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
      return $(".error").text("Exceeded character limit").toggle(true);
    }
    if (!tweetLength){
     return $(".error").text("Invalid input").toggle(true);
    }

    $.post( "/tweets", $form.serialize(), loadTweets );
    $(".new-tweet .counter").text("140");
    $(".new-tweet textarea").val("").focus();
    $(".error").text("").toggle(false);
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


