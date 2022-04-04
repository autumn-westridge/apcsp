var dudeX = 100;
var dudeY = 300;
var minX = 0;
var minY = -50;
var maxX = 540;
var maxY = 380;

var moveAmt = 10;

var modalShowing = false;

function checkKey(e) {
  if (e.code.startsWith("Arrow")) {
    checkMove(e);
  }
}

function checkMove(e) {
  if (e.code == "ArrowRight") {
    if (dudeX < maxX) {
      dudeX += moveAmt;
    }
  }
  else if (e.code == "ArrowLeft") {
    if (dudeX > minX) {
      dudeX -= moveAmt;
    }
  }
  else if (e.code == "ArrowDown") {
    if (dudeY < maxY) {
      dudeY += moveAmt;
    }
  }
  else if (e.code == "ArrowUp") {
    if (dudeY > minY) {
      dudeY -= moveAmt;
    }
  }
  bluedude.style.marginLeft = dudeX + "px";
  bluedude.style.marginTop = dudeY + "px";
}

var bluedude = document.getElementById("bluedude");
document.addEventListener("keydown", checkKey);
