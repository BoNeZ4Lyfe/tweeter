$(document).ready(function () {
  $(".form-text").on("input", function () {
    let input = $(this);
    let length = input.val().length;

    let counter = $("#counter");
    counter.val(140 - length);
    if (counter.val() < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "black");
    }
  });
});
