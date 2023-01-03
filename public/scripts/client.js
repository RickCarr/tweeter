const createTweetElement = (tweetData) => {
  const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const $tweet = $(`
      <article class="tweet">
        <header>
          <span>            
            <img height='80px' width='80px' src="${tweetData.user.avatars}">
            <p class="userName">${tweetData.user.name}</p>
          </span>
          <p class="handle">${tweetData.user.handle}</p>
        </header>
        <div id="content">${escape(tweetData.content.text)}</div>
        <footer>
        <span>${timeago.format(tweetData.created_at)}</span>
        <div id="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
      `);

  return $tweet;
};

const renderTweets = (tweets) => {
  const $tweetSection = $('.tweet-container');
  $tweetSection.empty();
  for (let tweet of tweets) {
    const $userTweet = createTweetElement(tweet);
    $tweetSection.prepend($userTweet);
  }
};

const loadTweets = () => {
  try {
    $.get('/tweets', (tweets) => {
      renderTweets(tweets);
    });
  } catch (error) {
    console.error(error);
  }
};

$(() => {
  // loads tweets upon doc ready
  loadTweets();
  // validates tweet submission
  const $chirp = $('#compose-tweet');
  $chirp.submit((event) => {
    const error = $('#error');
    event.preventDefault();

    const chirpMsg = $('#tweet-text').val().trim();
    // returns error if submission is empty
    if (!chirpMsg) {
      error.addClass("error");
      error.text(" ⚠ If you ain't typing, you ain't chirp'n! ⚠ ");
      return error.slideDown();
    }
    // returns error if submission is too long
    if (chirpMsg.length > 140) {
      error.addClass("error");
      error.text(" ⚠ Whoa there, Kanye! Please keep your rant below 140 characters. ⚠ ");
      return error.slideDown();
    } else {
      error.slideUp();
    }
    // posts submission if no errors
    $.post('/tweets', $chirp.serialize(), (response) => {
      try {
        loadTweets(response);
        $('#tweet-text').val("");
        $('.counter').text(140);
      } catch (error) {
        console.error(error);
      }
    });
  });
}); 