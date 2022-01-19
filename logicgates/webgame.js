const gates = [
  {
    name: "AND",
    vals: [0, 0, 0, 1],
    desc: "AND evaluates to true if and only if BOTH inputs are true. This is similar to how 'and' works in English; if you say 'I have a dog AND I have a cat', that statement is true only if you have both a dog and a cat."
  },
  {
    name: "OR",
    vals: [0, 1, 1, 1],
    desc: "OR evaluates to true if EITHER inputs are true as well as if BOTH inputs are true. This is different from how 'or' works in English; if you say 'I have a dog OR I have a cat', in English you would think that you have only one or the other, but not both. However, in programming, 'I have a dog or I have a cat' is true for someone who has both a dog and a cat."
  },
  {
    name: "NOT",
    vals: [1, 0],
    desc: "NOT is the only one of these basic gates that accepts a single value. It evaluates to true if the input is false, and to false if the input is true."
  },
  {
    name: "NAND",
    vals: [1, 1, 1, 0],
    desc: "NAND is the opposite of AND (NOT + AND). It evaluates to true in every case that AND is false, and false in every case that AND is true. Ergo, the result is false if both inputs are true; otherwise, it's true."
  },
  {
    name: "NOR",
    vals: [1, 0, 0, 0],
    desc: "NOR is the opposite of OR (NOT + OR) and can also be thought of as 'neither'. It evaluates to true in every case that OR is false, and false in every case that OR is true. Ergo, the result is false if either or both inputs are true, and true only if NEITHER is true (both are false)."
  },
  {
    name: "XOR",
    vals: [0, 1, 1, 0],
    desc: "XOR is the 'eXclusive OR'. It evaluates to true if EXACTLY ONE of the inputs is true and the other is false; it evaluates to false if both inputs are the same value, whether that's true or false. This is closer to how OR works in English, where someone who says 'I have a dog or I have a cat' is typically indicating that they have one or the other, but not both."
  }
];
const mapping = ["00", "01", "10", "11"];
const tt    = document.getElementById("truthtable");
const ttn   = document.getElementById("truthtablenot");
const desc  = document.getElementById("description");
const label = document.getElementById("label");
const gg    = document.getElementById("gamegate");
const g     = document.getElementById("game");
const gn    = document.getElementById("gamenot");
const gb1   = document.getElementById("gamebutton1");
const gb2   = document.getElementById("gamebutton2");
const gb3   = document.getElementById("gamebutton3");
const rb    = document.getElementById("resultbutton");
const rbn   = document.getElementById("resultbuttonnot");

var gamebutton1  = false;
var gamebutton2  = false;
var gamebutton3  = false;
var resultbutton = false;
var resultbuttonnot = true;

function changeGate(sel) {
  var newGate = sel.selectedIndex;
  let gate = gates[newGate];
  label.innerText = gate.name;
  gg.innerText = gate.name;
  desc.innerText = gate.desc;
  
  if (newGate == 2) {
    tt.style.display = "none";
    ttn.style.display = "table";
    g.style.display = "none";
    gn.style.display = "table";
  }
  else {
    tt.style.display = "table";
    ttn.style.display = "none";
    g.style.display = "table";
    gn.style.display = "none";

    let v = gate.vals;
    for (let i = 0; i < v.length; i++) {
      var el = document.getElementById(mapping[i]);
      el.innerText = v[i];
      el.classList = v[i] ? "true result" : "false result";
    }
    
  }
  
  updateGameButtons();
}

function gameClick(el) {
  let whichbutton = el.id;
  if (whichbutton == "gamebutton3") {
    gamebutton3 = !gamebutton3;
    resultbuttonnot = !resultbuttonnot;
  }
  else {
    if (whichbutton == "gamebutton1") {
      gamebutton1 = !gamebutton1;
    }
    else {
      gamebutton2 = !gamebutton2;
    }
  }
  updateGameButtons();
}

function updateGameButtons() {
  // This is literally the stupidest possible way to do this
  let str = (gamebutton1 ? "1" : "0") + "" + (gamebutton2 ? "1" : "0");
  let ttval = document.getElementById(str).innerText;
  resultbutton = (ttval == "1") ? true : false;
  
  gb3.classList = gamebutton3 ? "gamebutton true" : "gamebutton false";
  gb3.innerText = gamebutton3 ? "TRUE" : "FALSE";
  rbn.classList = resultbuttonnot ? "gamebutton true" : "gamebutton false";
  rbn.innerText = resultbuttonnot ? "TRUE" : "FALSE";
  gb1.classList = gamebutton1 ? "gamebutton true" : "gamebutton false";
  gb1.innerText = gamebutton1 ? "TRUE" : "FALSE";
  gb2.classList = gamebutton2 ? "gamebutton true" : "gamebutton false";
  gb2.innerText = gamebutton2 ? "TRUE" : "FALSE";
  rb.classList = resultbutton ? "gamebutton true" : "gamebutton false";
  rb.innerText = resultbutton ? "TRUE" : "FALSE";
}