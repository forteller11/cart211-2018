let heads = [];

function setup(){
  createCanvas(windowWidth,windowHeight);
  for (let i = 0; i < 100; i ++){
  heads[i] = new Head;
  }
}
function draw(){
background(255);
  for (let i = 0; i < heads.length; i ++){
  heads[i].update();
  }
}
