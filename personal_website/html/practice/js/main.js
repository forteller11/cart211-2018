let heads = [];

function setup(){
  createCanvas(windowWidth,windowHeight);
  for (let i = 0; i < 8; i ++){
  heads[i] = new Head("exercises/root_day2/index.html","class2");
  }
}
function draw(){
background(255);
  for (let i = 0; i < heads.length; i ++){
  heads[i].update();
  }
}
