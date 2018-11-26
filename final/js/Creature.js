class Creature {
  constructor(){
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.noiseXIndex = random(1000);
    this.noiseYIndex = random(1000);
    this.noiseIncrement = random(.01);
    this.xVec;
    this.yVec;
    this.angularAcceleration = 4;
    this.acceleration;
    this.xTarget;
    this.yTarget;
    this.minMaxRange = 10;
    this.size = random(20,100);

    let mM = this.minMaxRange;
    this.xSlider = createSlider(-mM, mM, lerp(-mM,mM,.5), mM/50);
    this.xSlider.style('position', 'fixed');
    this.xSlider.style('width', this.size+'px');
    // this.xSlider.style('display',"none");

    this.ySlider = createSlider(-mM, mM, lerp(-mM,mM,.5), mM/50);
    this.ySlider.style('position', 'fixed');
    this.ySlider.style('width', this.size+'px');
    this.ySlider.style('height', this.size+'px');
    this.ySlider.style('display',"none");

    this.radio = createRadio();
    this.radio.option('');
    this.radio.style('position', 'fixed');
    this.radio.style('left', this.x+"px");
    this.radio.style('top', this.y+"px");
    this.radio.style('width', 100+"%");
    this.radio.style('height', this.size+"px");
    // this.radio.style('transform', "scale("+this.size/40+")");
  }
  updateNoise(){
    this.noiseXIndex += this.noiseIncrement;
    this.noiseYIndex += this.noiseIncrement;
    this.x = noise(this.noiseXIndex) * windowWidth;
    this.y = noise(this.noiseYIndex) * windowHeight;
  }
  updateTarget(){
    this.xTarget = mouseX;
    this.yTarget = mouseY;
  }
  updateVectors(){
    const steeringCorrection = 20; //1 = perfect correction every frame so vecs pointed towards target
    //find diff in angle between two vecs (via division)
    //based on this new angle, calc vectors using a normalized magnitude

    //angle of vec to target
    //current angle
    //difference in angles,
    //new angle
    //new vectors based on vector and mag
    const xVecToTarget = this.xTarget-this.x;
    const yVecToTarget = this.yTarget-this.y;
    const angleToTarget = atan2(yVecToTarget,xVecToTarget);
    const currentAngle = atan2(this.xVec,this.yVec);
    const desiredChangeInAngle = angleToTarget-currentAngle;
    const newAngle = currentAngle + (desiredChangeInAngle/20);

    this.xVec = cos(newAngle) * this.acceleration;
    this.yVec = sin(newAngle) * this.acceleration;
    //calc vector, normalize vector, recalc vecs

  }
  updatePositionBasedOnVectors(){
    this.x += this.xVec;
    this.y += this.yVec;

  }
  display(){
    const sliderXValue = map(this.x,0,windowWidth,-this.minMaxRange,this.minMaxRange);

    this.xSlider.value(sliderXValue);
    this.xSlider.style('left', this.x+"px");
    this.xSlider.style('top', this.y+"px");

    this.ySlider.style('left', this.x+"px");
    this.ySlider.style('top', this.y+"px");
    this.radio.style('left', this.x+this.size/2+"px");
    this.radio.style('top', this.y-this.size/10+"px");
  }

}
