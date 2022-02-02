/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(function () {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1643582533016,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1643668933016,
    },
  ];
  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  };

  const renderTweets = function (tweets) {
    let $html= "";
    for (let tweet of tweets) {
      $html += createTweetElement(tweet);
    }

    $("#tweets").empty().append($html);
  };

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
  const $tweet = createTweetElement(tweetData);

  $("#tweet").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  $(".form").on("submit", (evt) => {
    evt.preventDefault();

    const $post = $(".form").serialize();
    $.post("/tweets", $post).then(() => {
      renderTweets(data);
    });
  });
});
