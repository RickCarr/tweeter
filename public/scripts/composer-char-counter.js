$(() => {
  $('#tweet-text').on('input', function() {
    let count = $('.counter');
    let newCount = 140 - $(this).val().length;
    count.text(newCount);
    (newCount < 0) ? count.addClass("turning-red") : count.removeClass("turning-red");
  });
});