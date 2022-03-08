var gameState = -1;
var gameStateMax = 3;

var dudeX = 100;
var dudeY = 300;
var maxX = 540;
var maxY = 380;

var moveAmt = 10;

var modalShowing = false;

function checkKey(e) {
  if (e.code.startsWith("Arrow")) {
    checkMove(e);
  }
  else if (e.code == "Enter") {
    if (modalShowing) {
      hideModal();
    }
    else {
      checkInteraction();
    }
  }
}

function checkMove(e) {
  if (e.code == "ArrowRight") {
    if (dudeX < maxX) {
      dudeX += moveAmt;
    }
  }
  else if (e.code == "ArrowLeft") {
    if (dudeX > 0) {
      dudeX -= moveAmt;
    }
  }
  else if (e.code == "ArrowDown") {
    if (dudeY < maxY) {
      dudeY += moveAmt;
    }
  }
  else if (e.code == "ArrowUp") {
    if (dudeY > 0) {
      dudeY -= moveAmt;
    }
  }
  bluedude.style.marginLeft = dudeX + "px";
  bluedude.style.marginTop = dudeY + "px";
}

function checkInteraction() {
  var els = document.getElementsByClassName("gs" + gameState);
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    if (elementsOverlap(bluedude, el)) {
      interactive_elements[el.id]();
    }
  }
}

function elementsOverlap(el1, el2) {
  var domRect1 = el1.getBoundingClientRect();
  var domRect2 = el2.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}

function help() {
  showModal("Move: Arrow keys\nInteract with object: Enter");
}

function showModal(msg, img) {
  modalText.innerText = msg;
  if (img) {
    modalImg.src = img;
  }
  else {
    modalImg.src = "";
  }
  modal.style.display = "block";
  modalShowing = true;
}
function hideModal() {
  modal.style.display = "none";
  modalShowing = false;
}

function openBox() {
  showModal("You got an orange key.", "orangekey.png");
  advanceGameState();
}
function boxEmpty() {
  showModal("There's nothing else in here.");
}

function openDoor() {
  if (gameState == 0) {
    showModal("It's locked.");
  }
  else if (gameState == 1) {
    showModal("You unlock the door and procede into the next room.");
    advanceGameState();
  }
}

function advanceGameState() {
  for (var i = 0; i < gameStateMax; i++) {
    var els = document.getElementsByClassName("gs" + i);
    for (var j = 0; j < els.length; j++) {
      els[j].style.display = "none";
    }
  }
  gameState++;
  var els = document.getElementsByClassName("gs" + gameState);
  for (var j = 0; j < els.length; j++) {
    els[j].style.display = "block";
  }
}

var bluedude = document.getElementById("bluedude");
var modal = document.getElementById("modal");
var modalText = document.getElementById("modalText");
var modalImg = document.getElementById("modalImg");
document.addEventListener("keydown", checkKey);

advanceGameState();

var interactive_elements = {
  "boxclosed": openBox,
  "boxopen": boxEmpty,
  "doorclosed": openDoor
};
