let heads = [];

function setup(){
  for (let i = 0; i < 3; i ++){
  heads[i] = new Head;
  }
}
function draw(){
  for (let i = 0; i < heads.length; i ++){
  heads[i].update();
  }
}
