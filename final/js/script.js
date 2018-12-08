let creature = [];
let creaturePop;
let style = true;
let debugDisplay = false;
let food = [];
const foodSpawnRate = 10; //every __ frames spawn food
const creatureSpawnRate = 200;
let creatureSpawnCounter = 0;
let foodSpawnCounter = 0;
let creatureMinSize = 60;
let creatureMaxSize = 120;
let play = 1;
'use strict'

function setup() {
  let creaturePop = windowWidth / 100;
  if (debugDisplay) {
    createCanvas(windowWidth, windowHeight);
  }

  for (let i = 0; i < creaturePop; i++) {
    let pred;
    if (random(1) > .9) {
      pred = true;
    } else {
      pred = false
    }
    const randomName = floor(random(names.length));
    let sz = random(creatureMinSize,creatureMaxSize);
    creature.push(new Creature(sz, names[randomName], 0, pred));
    // console.log(creature[i]);
  }

  for (let i = 0; i < 10; i++) {
    food[i] = new Food();
  }
}

function draw() {
  if (play > 0){
    if (debugDisplay) {
      background(255, 255, 255);
    }
    //spawn new food
    foodSpawnCounter++;
    creatureSpawnCounter++;
    if (foodSpawnCounter >= foodSpawnRate) {
      food.push(new Food());
      foodSpawnCounter = 0;
    }
    if (creatureSpawnCounter >= creatureSpawnRate) {
      let predator = false;
      if (random(1) > .98) {
        predator = true;
      }
      const randomName = floor(random(names.length));
      let sz = random(creatureMinSize,creatureMaxSize);
      creature.push(new Creature(sz,names[randomName], 0, predator));
      creatureSpawnCounter = 0;
    }

    for (let i = 0; i < creature.length; i++) {
      creature[i].update();
      if (creature[i].food < 0) {
        creature[i].div.style.display = "none";
        creature.splice(i, 1);
      }
    }

    for (let i = 0; i < food.length; i++) {
      food[i].update();
    }
  }
}
function keyPressed(){
  if (keyCode === SHIFT){
    play = play *-1;
  }

  if (keyCode === DOWN_ARROW){//spawn creature at mouse position on mouse click
    const randomName = floor(random(names.length));
    let sz = random(creatureMinSize,creatureMaxSize);
    let newCreature = new Creature(sz,names[randomName], 0, true);
    newCreature.x = mouseX;
    newCreature.y = mouseY;
    creature.push(newCreature);
  }

  if (keyCode === UP_ARROW){//spawn creature at mouse position on mouse click
    const randomName = floor(random(names.length));
    let sz = random(creatureMinSize,creatureMaxSize);
    let newCreature = new Creature(sz,names[randomName], 0, false);
    newCreature.x = mouseX;
    newCreature.y = mouseY;
    creature.push(newCreature);
  }
}


let names = [
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
