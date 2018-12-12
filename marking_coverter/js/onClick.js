let fontSize;
function setup(){
  createCanvas(windowWidth, windowHeight);
  fontSize = 16;
}
let textBox = document.getElementById("text");
function draw(){
  let grade = ["F","D-","D","D+","C-","C","C+","B-","B","B+","A-","A","A+"];
  let baseMinRange = [0, 50, 53, 57, 60, 63, 67, 70, 73, 77, 80, 85, 90];
  let baseMaxRange = [49, 52, 56, 59, 62, 66, 69, 72, 76, 79, 84, 89, 100];
  let newMinRange = [];
  let newMaxRange = [];
background(255);
for (let i = 0; i < baseMinRange.length; i ++){
  ratio = textBox.value/100;
  newMinRange[i] = round(baseMinRange[i]*ratio*10)/10;
  newMaxRange[i] = round(baseMaxRange[i]*ratio*10)/10;
  let vSpacing = fontSize+fontSize*.6;
  let stringGrade = (grade[i])
  let stringRange = (newMinRange[i] + "-" + newMaxRange[i]);
  fill(0);
  let xx = width/2-65;
  let yy = (vSpacing * i);
  textSize(18);
  text(stringGrade,xx,yy+130);
  // text(":", xx+32, yy+130);
  text(stringRange, xx+64, yy+130);
  //calc new array values based on bases,
  //draw those values to screen
  //aligned
  //html
}

}
