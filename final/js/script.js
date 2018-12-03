let creature = [];
let creaturePop = 10;
let style = true;
let debugDisplay = false;
let food = [];
'use strict'
function setup(){
  if (debugDisplay){createCanvas(windowWidth,windowHeight);}

  for (let i = 0; i < creaturePop; i ++){
    creature[i] = new Creature();
  }

  for (let i = 0; i < creaturePop*6; i ++){
    food[i] = new Food();
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
  }

  for (let i = 0; i < food.length; i ++){
    food[i].update();
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
