class Creature {
  constructor(){
    this.x = 0;
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
    this.size = 200;

    let mM = this.minMaxRange;
    this.xSlider = createSlider(-mM, mM, lerp(-mM,mM,.5), mM/20);
    this.xSlider.style('position', 'fixed');
    this.xSlider.style('width', this.size+'px');
    // this.xSlider.style('display',"none");

    this.ySlider = createSlider(-mM, mM, lerp(-mM,mM,.5), mM/20);
    this.ySlider.style('position', 'fixed');
    this.ySlider.style('width', this.size+'px');
    this.ySlider.style('height', this.size+'px');
    this.ySlider.style('display',"none");
  }
  updateNoise(){
    this.noiseXIndex += this.noiseIncrement;
    this.noiseYIndex += this.noiseIncrement;
    this.x = noise(this.noiseXIndex) * windowWidth;
    this.y = noise(this.noiseYIndex) * windowHeight;

    const sliderXValue = map(this.x,0,windowWidth,-this.minMaxRange,this.minMaxRange);

    this.xSlider.value(sliderXValue);
    this.xSlider.style('left', this.x+"px");
    this.xSlider.style('top', this.y+"px");

    this.ySlider.style('left', this.x+"px");
    this.ySlider.style('top', this.y+"px");
  }
  updateVectors(){
    this.x =
    this.y = noise(this.noiseYIndex) * windowHeight;

    this.xVecRange.style('left', this.x+"px");
    this.xVecRange.style('top', this.y+"px");
  }
  display(){

  }

}
