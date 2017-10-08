window.addEventListener('load', function() {

  var revealButton = document.querySelector(".reveal-solution");
  var solution = document.querySelector(".solution");
  revealButton.addEventListener("click", function(e) {
    e.preventDefault();
    solution.classList.toggle('invisible');
  }, false);

});
