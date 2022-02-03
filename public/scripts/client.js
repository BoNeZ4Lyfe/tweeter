/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  //fetch tweets
  // $(".form").on("submit", (evt) => {
  //   evt.preventDefault();

  //   const $post = $(".form").serialize();
  //   $.post("/tweets", $post).then(() => {
  //     renderTweets(data);
  //   });
  // });

  // loadTweets();

  //validation
  $(".form").on('submit', function(evt) {
    evt.preventDefault();
    let input = $('.form-text').val().length;

    if (!input) {
      alert('Nothing was entered');
    } else if (input > 140) {
      alert('Exceeded character limit');
    } else {
      const $post = $(".form").serialize();
    $.post("/tweets", $post).then(() => {
      //renderTweets(data);
    });
    loadTweets();
    }
});
});

  

  

const createTweetElement = function (tweet) {
  let avatar = tweet.user.avatars;
  let userName = tweet.user.name;
  let handle = tweet.user.handle;
  let message = tweet.content.text;
  let time = timeago.format(tweet.created_at);

  let $tweet = `
      <article class="tweet">
        <header class="tweet-header">
            <div class="image-name">
              <img src="${avatar}" class="tweet-image"/>
              <h3 class="tweet-name">${userName}</h3>
            </div>
            <div class="handle">
              <h4 class="tweet-username"> ${handle}</h4>
            </div>
        </header>
        <p class="tweet-characters">${message}</p>
        <footer class="tweet-footer">
          <p class="footer-age">${time}</p>
          <div class="footer-icon">
            <i id="flag"class="fas fa-flag"></i>
            <i id="retweet"class="fas fa-retweet"></i>
            <i id="heart"class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
`;
  return $tweet;
};

const renderTweets = function (tweets) {
  let $html = "";
  for (let tweet of tweets) {
    $html += createTweetElement(tweet);
  }

  $("#tweets").empty().append($html);
};

const loadTweets = () => {
  $.get("http://localhost:8080/tweets", function (data, status) {
    renderTweets(data);
  });
};