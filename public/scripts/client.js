/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  $(".form").on("submit", (evt) => {
    evt.preventDefault();

    const $post = $(".form").serialize();
    $.post("/tweets", $post).then(() => {
      renderTweets(data);
    });
  });

  loadTweets();
});


const createTweetElement = function (tweet) {
  let $tweet = `
      <article class="tweet">
        <header class="tweet-header">
            <div class="image-name">
              <img src="${tweet.user.avatars}" class="tweet-image"/>
              <h3 class="tweet-name">${tweet.user.name}</h3>
            </div>
            <div class="handle">
              <h4 class="tweet-username"> ${tweet.user.handle}</h4>
            </div>
        </header>
        <p class="tweet-characters">${tweet.content.text}</p>
        <footer class="tweet-footer">
          <p class="footer-age">${timeago.format(tweet.created_at)}</p>
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
    console.log(tweet);
  }

  $("#tweets").empty().append($html);
};

const loadTweets = () => {
  $.get("http://localhost:8080/tweets", function (data, status) {
    renderTweets(data);
  });
};