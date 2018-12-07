let creature = [];
let creaturePop = 20;
let style = true;
let debugDisplay = false;
let food = [];
const foodSpawnRate = 5; //every __ frames spawn food
let foodSpawnCounter = 0;
'use strict'
function setup(){
  if (debugDisplay){createCanvas(windowWidth,windowHeight);}

  for (let i = 0; i < creaturePop; i ++){
    creature[i] = new Creature(random(40, 80),0);
    console.log(creature[i]);
  }

  for (let i = 0; i < creaturePop*2; i ++){
    food[i] = new Food();
  }
}

function draw(){
  if (debugDisplay){background(255,255,255);}
  //spawn new food
  foodSpawnCounter++;
  if (foodSpawnCounter >= foodSpawnRate){
    food[food.length] = new Food();
    foodSpawnCounter = 0;
  }

  for (let i = 0; i < creature.length; i ++){
    creature[i].update();
    if (creature[i].food < 0) {
      creature[i].div.style.display = "none";
      creature.splice(i,1);
    }
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
