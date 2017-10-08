var revealButton = document.querySelector("button.reveal-solution");
var solution = document.querySelector(".solution");

if(revealButton && solution) {
  revealButton.addEventListener("click", function(e) {
    solution.classList.toggle('invisible');
  });
}
