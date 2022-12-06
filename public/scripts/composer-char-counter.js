$(document).ready(function() {
  $('#tweet-text').on('keyup', function() {
    let newCount = 140 - $(this).val().length;
    $('.counter').text(newCount);
    (newCount < 0) ? $('.counter').addClass("turningRed") : $('.counter').removeClass("turningRed");
  });
});
