let creature = [];
function setup(){
  for (let i = 0; i < 3; i ++){
    creature[i] = new Creature();
  }
}

function draw(){
  for (let i = 0; i < creature.length; i ++){
    // creature[i].updateNoise();
    creature[i].updateTarget();
    creature[i].updateVectors();
    creature[i].updatePositionBasedOnVectors();
    creature[i].display();
    // console.log("hey");
  }
}
