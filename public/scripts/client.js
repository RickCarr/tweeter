/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(() => {
  const $tweetSection = $('.tweetContainer');

  const renderTweets = (tweets) => {  //tweets == data of database
    $tweetSection.empty();
    for (let tweet of tweets) { //loops through each user in database
      const $userTweet = createTweetElement(tweet); //makes new user with $user jquery var       
      $tweetSection.prepend($userTweet); // takes return value and appends it to the tweets container            
    }
  };
  //create tweet function
  const createTweetElement = (tweetData) => {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <span>            
            <img height='100px' width='100px' src="${tweetData.user.avatars}">
            <p class="userName">${tweetData.user.name}</p>
          </span>
          <p class="handle">${tweetData.user.handle}</p>
        </header>
        <div id="content">${tweetData.content.text}</div>
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
  // renderTweets(data);  //initiates renderTweets to go through the database

  //submit listener
  const $chirp = $('#composeTweet');
  $chirp.submit((event) => {
    event.preventDefault();
    const chirpMsg = $('#tweet-text').val().trim();
    if (!chirpMsg) {
      return alert("If you ain't typing, you ain't chirp'n!  (type something)");
    } else {
      if (chirpMsg.length > 140) {
        return alert('Whoa there, Kanye! Please keep your rant below 140 characters. 👌');
      }
    }
    $.post('/tweets', $chirp.serialize(), (response) => {
      loadTweets(response);
      $('#tweet-text').val("");
    });
  });
  const loadTweets = () => {
    $.get('/tweets', (tweets) => {
      renderTweets(tweets);           
    });
  };
  // $.ajax({ 
  //   method: 'POST', 
  //   url: '/tweets', 
  //   data: $('#tweetForm').serialize()
  // })
  // .then



}); //end of jQuery doc ready f

  //***to use jquert to pull data from outside this file after we remove database***
