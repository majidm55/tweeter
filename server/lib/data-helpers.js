"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.tweets.insertOne(newTweet);
        callback(null, true)

    },


    // Get all tweets from Mongo`db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
  }
}

  };
