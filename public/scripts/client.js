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
  const $tweetSection = $('.tweetContainer');
  $tweetSection.empty();
  for (let tweet of tweets) {
    const $userTweet = createTweetElement(tweet);
    $tweetSection.prepend($userTweet);
  }
};

const loadTweets = () => {
  $.get('/tweets', (tweets) => {
    renderTweets(tweets);
  });
};

$(() => {
  loadTweets();
  const $chirp = $('#composeTweet');
  $chirp.submit((event) => {
    const error = $('#error');
    event.preventDefault();
    const chirpMsg = $('#tweet-text').val().trim();
    if (!chirpMsg) {
      error.addClass("error");
      error.text(" ⚠ If you ain't typing, you ain't chirp'n! ⚠ ");
      return error.slideDown();
    }
    if (chirpMsg.length > 140) {
      error.addClass("error");
      error.text(" ⚠ Whoa there, Kanye! Please keep your rant below 140 characters. ⚠ ");
      return error.slideDown();
    } else {
      error.slideUp();
    }
    $.post('/tweets', $chirp.serialize(), (response) => {
      loadTweets(response);
      $('#tweet-text').val("");
      $('.counter').text(140);
    });
  });
}); 