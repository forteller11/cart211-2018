let creature = [];
let creaturePop;
let style = true;
let debugDisplay = false;
let food = [];
let spawnRateSliderPointer;
let foodSpawnRate; //every __ frames spawn food
const creatureSpawnRate = 300;
let creatureSpawnCounter = 0;
let foodSpawnCounter = 0;
let creatureMinSize = 60;
let creatureMaxSize = 120;
let play = 1;
'use strict'

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

function setup() {
   spawnRateSliderPointer = document.getElementById("foodSpawnRateRange");
  const buttonPred = document.getElementById("spawnPred");//spawns pred on click
  buttonPred.onclick = function(){
    const randomName = floor(random(names.length));
    let sz = random(creatureMinSize,creatureMaxSize);
    let newCreature = new Creature(sz,names[randomName], 0, true);
    newCreature.x = random(windowWidth);
    newCreature.y = random(windowHeight);
    creature.push(newCreature);
  }

  const buttonHerb = document.getElementById("spawnHerb"); //spawns herbivore on click
  buttonHerb.onclick = function() {
    const randomName = floor(random(names.length));
    let sz = random(creatureMinSize,creatureMaxSize);
    let newCreature = new Creature(sz,names[randomName], 0, false);
    newCreature.x = random(windowWidth);
    newCreature.y = random(windowHeight);
    creature.push(newCreature);
  }

  let creaturePop = windowWidth / 100;
  if (debugDisplay) {
    createCanvas(windowWidth, windowHeight);
  }

  for (let i = 0; i < creaturePop; i++) {
    const randomName = floor(random(names.length));
    let sz = random(creatureMinSize,creatureMaxSize);
    creature.push(new Creature(sz, names[randomName], 0, false));
    // console.log(creature[i]);
  }

  for (let i = 0; i < 10; i++) {
    food[i] = new Food();
  }
}

function draw() {
  foodSpawnRate = spawnRateSliderPointer.value;
  if (play > 0){
    if (debugDisplay) {
      background(255, 255, 255);
    }
    //spawn new food
    foodSpawnCounter++;
    if (creature.length < 10){creatureSpawnCounter++;}
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
}