let heads = [];

function setup(){
  createCanvas(windowWidth,windowHeight);
  heads[0] = new Head("exercises/class2/index.html","class 2");
  heads[1] = new Head("exercises/class3/index.html","class 3");
  heads[2] = new Head("exercises/class4/index.html","class 4");
  heads[3] = new Head("exercises/class5/index.html","class 5");
  heads[4] = new Head("exercises/class6/index.html","class 6");
  heads[5] = new Head("exercises/class8/index.html","class 8");
  heads[6] = new Head("exercises/class9/index.html","class 9");

  heads[7] = new Head("../../index.html", "home");
  heads[8] = new Head("../readings.html","readings");
  heads[9] = new Head("../../final_proposal/html/research.html","midterm proposal");
}
function draw(){
background(255);
  for (let i = 0; i < heads.length; i ++){
  heads[i].update();
  }
}
