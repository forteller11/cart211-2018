class Creature {
  constructor(){
    this.x = 30;
    this.y = 0;
    this.noiseXIndex = random(1000);
    this.noiseYIndex = random(1000);
    this.noiseIncrement = random(.01);
    this.xVec;
    this.yVec;
    this.angularAcceleration;
    this.acceleration;
    this.xTarget;
    this.yTarget;
    this.minMaxRange = 10;
    let mM = this.mineMaxRange;
    this.xVecRange = createSlider(-mM, mM, lerp(-mM,mM,.5), mM/20);
    this.xVecRange.style('position', 'fixed');
    this.xVecRange.style('left', this.x+"px");
    this.xVecRange.style('top', this.y+"px");
    // this.xVecRange = document.getElementById("myRange");
    // this.btn = document.createElement("BUTTON");
    // this.xVecRange = document.createElement("INPUT");
    // this.xVecRange.setAttribute("range", 20);
  }
  update(){
    // console.log('hey');
    this.noiseXIndex += this.noiseIncrement;
    this.noiseYIndex += this.noiseIncrement;
    this.x = noise(this.noiseXIndex) * 1000;
    console.log(this.x);
    this.y = noise(this.noiseYIndex) * 1000;
    this.xVecRange.style('left', this.x+"px");
    this.xVecRange.style('top', this.y+"px");

  }
  display(){

  }

}
