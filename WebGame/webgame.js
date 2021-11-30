console.log("hello world")
var welcome = document.getElementById("welcome");
var numClick = 0;

function buttonClick() {
  numClick++;
  welcome.innerText = numClick;
  checkWin();
}

function checkWin() {
  if (numClick >= 20) {
    welcome.innerText = "You win!"
    var kitten = document.getElementById("kitten");
    kitten.style.display = "block";
  }
}