let creature = [];
let style = true;
let debugDisplay = false;
'use strict'
function setup(){
  if (debugDisplay){createCanvas(windowHeight,windowWidth);}

  for (let i = 0; i < 20; i ++){
    creature[i] = new Creature();
  }
}

function draw(){
  if (debugDisplay){background(255,255,255);}
  for (let i = 0; i < creature.length; i ++){
    // creature[i].updateNoise();
    creature[i].update();
    // creature[i].updateTarget();
    // creature[i].updateVectors();
    // creature[i].updatePositionBasedOnVectors();
    // creature[i].display();
    // console.log("hey");
  }
}

let names = 	[
"Olivia",
"Oliver",
"Amelia",
"Harry",
"Isla",
"Jack",
"Emily",
"George",
"Ava",
"Noah",
"Lily",
"Charlie",
"Mia",
"Jacob",
"Sophia",
"Alfie",
"Isabella",
"Freddie",
"Grace",
"Oscar"
]
