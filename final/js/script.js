let creature = [];
function setup(){
  for (let i = 0; i < 10; i ++){
    creature[i] = new Creature();
  }
}

function draw(){
  for (let i = 0; i < creature.length; i ++){
    creature[i].updateNoise();
    // console.log("hey");
  }
}
