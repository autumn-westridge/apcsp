var gameState = -1;
var gameStateMax = 4;

var dudeX = 100;
var dudeY = 300;
var minX = 0;
var minY = -50;
var maxX = 540;
var maxY = 380;

var moveAmt = 15;

var modalShowing = false;
var convoShowing = false;

function checkKey(e) {
  if (e.code.startsWith("Arrow")) {
    checkMove(e);
  }
  else if (e.code == "Enter") {
    if (modalShowing) {
      hideModal();
    }
    else if (convoShowing) {
      hideConvo();
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

function checkInteraction() {
  var els = document.getElementsByClassName("gs" + gameState);
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    if (elementsOverlap(bluedude, el)) {
      interactive_elements[el.id](el);
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

function showModal(msg, img) {
  modalText.innerHTML = msg;
  if (img) {
    modalImg.src = img;
  }
  else {
    modalImg.src = "";
  }
  hideConvo();
  modal.style.display = "block";
  modalShowing = true;
}
function hideModal() {
  modal.style.display = "none";
  modalShowing = false;
}

function showConvo(msg) {
  convo.innerHTML = msg;
  hideModal();
  convo.style.display = "block";
  convoShowing = true;
}
function hideConvo() {
  convo.style.display = "none";
  convoShowing = false;
  document.removeEventListener("click", hideConvo);
}

function openBox() {
  if (gameState == 0) {
    showModal("You got an orange key.", "orangekey.png");
    advanceGameState();
  }
  else {
    showModal("There's nothing else in here.");    
  }
}

function openDoor() {
  if (gameState == 0) {
    showModal("It's locked.");
  }
  else if (gameState == 1) {
    showModal("You unlock the door with the orange key and procede into the next room.");
    advanceGameState();
  }
  else if (gameState == 2) {
    advanceGameState();
  }
  else if (gameState == 3) {
    advanceGameState(true)
  }
}

function advanceGameState(decrease, amount) {
  amount = amount == null ? 1 : amount;
  if (decrease) {
    gameState -= amount;
  }
  else {
    gameState += amount;
  }
  changeElements();
  changeDisplay();
}

function changeElements() {
  for (var i = 0; i < gameStateMax; i++) {
    var els = document.getElementsByClassName("gs" + i);
    for (var j = 0; j < els.length; j++) {
      els[j].style.display = "none";
    }
  }
  var els = document.getElementsByClassName("gs" + gameState);
  for (var j = 0; j < els.length; j++) {
    els[j].style.display = "block";
  }
}

function changeDisplay() {
  var displayVals = display[gameState];
  var keys = Object.keys(displayVals);
  for (var i = 0; i < keys.length; i++) {
    gamebox.style[keys[i]] = displayVals[keys];
  }
}

function conversationEl(el) {
  var convo_name = "convo_" + el.id;
  conversation(convo_name, "intro");
  
  var result = eval(convo_name).result;
  if (result > -1) {
    conversation(convo_name + "_over", "intro");
  }
}

function conversation(convo_name, path) {
  var option = eval(convo_name)[path];
  var optionHTML = option.words + "<br>";
  if (option.responses) {
    for (var i = 0; i < option.responses.length; i++) {
      optionHTML += "<button onClick=\"conversation('" + convo_name + "', '" + option.responses[i][1] + "')\">"
        + option.responses[i][0] + "</button>";
    }
  }
  else {
    optionHTML +=  "<button onClick=\"hideConvo()\">(end)</button>";
  }

  if (option.result) {
    eval(convo_name).result = option.result;
  }

  showConvo(optionHTML);
}

var bluedude = document.getElementById("bluedude");
var gamebox = document.getElementById("gamebox");
var modal = document.getElementById("modal");
var modalText = document.getElementById("modalText");
var modalImg = document.getElementById("modalImg");
var purpleDude = document.getElementById("purpledude");
var convo = document.getElementById("convo");
document.addEventListener("keydown", checkKey);

var interactive_elements = {
  "boxclosed": openBox,
  "boxopen": openBox,
  "doorclosed": openDoor,
  "dooropen": openDoor,
  "purpledude": conversationEl
};

var display = [
  // 0
  {
    "backgroundColor": "#333"
  },
  // 1
  {},
  // 2
  {
    "backgroundColor": "#332200"
  },
  // 3
  {
    "backgroundColor": "#333"
  },
]

advanceGameState();