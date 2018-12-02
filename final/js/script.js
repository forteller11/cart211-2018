let creature = [];
let style = true;
let debugDisplay = false;
'use strict'
function setup(){
  createCanvas(windowWidth,windowHeight);
  for (let i = 0; i < 20; i ++){
    creature[i] = new Creature();
  }
  createCanvas(windowWidth,windowHeight);
}

function draw(){
  createCanvas(windowWidth,windowHeight);
  background(255,255,255);
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
