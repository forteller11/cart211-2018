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
    creature[i] = new Creature(random(creatureMinSize, creatureMaxSize), 0, pred);
    // console.log(creature[i]);
  }

  for (let i = 0; i < 10; i++) {
    food[i] = new Food();
  }
}

function draw() {
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
    creature.push(new Creature((random(creatureMinSize, creatureMaxSize), 0, predator)));
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

function keyTyped() { //spawn creature at mouse position on mouse click
  // let pred;
  // if (random(1) > .97){
  //   pred = true;
  // } else {
  //   pred = false
  // }
  let newCreature = new Creature(random(creatureMinSize, creatureMaxSize), 0, false);
  newCreature.x = mouseX;
  newCreature.y = mouseY;
  creature.push(newCreature);
}

function mousePressed() { //spawn creature at mouse position on mouse click
  let pred;
  if (random(1) > .9) {
    pred = true;
  } else {
    pred = false
  }
  let newCreature = new Creature(random(creatureMinSize, creatureMaxSize), 0, true);
  newCreature.x = mouseX;
  newCreature.y = mouseY;
  creature.push(newCreature);
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
