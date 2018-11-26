let creature = [];
function setup(){
  for (let i = 0; i < 20; i ++){
    creature[i] = new Creature();
  }
}

function draw(){
  for (let i = 0; i < 20; i ++){
    creature[i].update();
    // console.log("hey");
  }
}
