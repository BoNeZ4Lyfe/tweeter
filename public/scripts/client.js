/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  loadTweets();

  //validation
  $(".form").on("submit", function (evt) {
    evt.preventDefault();
    let input = $(".form-text").val().length;
    if (!input) {
      $("#empty-error").show().append("Nothing was entered");
      setTimeout(() => {
        $("#empty-error").empty();
      }, 3000);
    } else if (input > 140) {
      $("#exceed-error").show().append("Exceeded character limit");
      setTimeout(() => {
        $("#exceed-error").empty();
      }, 3000);
    } else {
      const $post = $(".form").serialize();
      $.post("/tweets", $post).then(() => {
        let resetInput = $(".form-text").val("");
        loadTweets();
      });
    }
  });
});

const createTweetElement = function (tweet) {
  let avatar = escapeXss(tweet.user.avatars);
  let userName = escapeXss(tweet.user.name);
  let handle = escapeXss(tweet.user.handle);
  let message = escapeXss(tweet.content.text);
  let time = escapeXss(timeago.format(tweet.created_at));

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
  let orderOfTweets = tweets.reverse();
  for (let tweet of orderOfTweets) {
    $html += createTweetElement(tweet);
  }

  $("#tweets").empty().append($html);
};

const loadTweets = () => {
  $.get("http://localhost:8080/tweets", function (data, status) {
    renderTweets(data);
  });
};

const escapeXss = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};