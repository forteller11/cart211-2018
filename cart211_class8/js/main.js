let videoContainer = document.getElementById("videoContainer");
let video = document.getElementById("video");
let mouseXStore = 0;
let mouseYStore = 0;

//centers the div containing the video on the mouse position
//increases playbackspeed as the speed of the mouse increases
function draw(){
  //stores position of mouse in the previous frame,
  //calculates distance between previous position and current
  //then uses this value to change playbackSpeed of the video
  const mouseXDifference = mouseXStore - mouseX;
  const mouseYDifference = mouseYStore - mouseY;
  const mouseDistFromLastFrame = sqrt(sq(mouseXDifference)+sq(mouseYDifference));
  playbackRate = constrain(mouseDistFromLastFrame,0,10)*.3; //constraint is used to avoid errors with values that are not supported
  mouseXStore = mouseX;
  mouseYStore = mouseY;
  video.playbackRate = playbackRate;

  //centers image when it is 100% size
  videoContainer.style.left = mouseX-456/2+"px";
  videoContainer.style.top = mouseY-456/2+"px";
}
