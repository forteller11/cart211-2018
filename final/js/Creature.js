class Creature {
  constructor(){
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.noiseXIndex = random(1000);
    this.noiseYIndex = random(1000);
    this.noiseIncrement = random(.01);
    this.xVec = 1;
    this.yVec = 0;
    this.angle = atan2(this.yVec,this.xVec);
    this.angularAcceleration = .1;
    this.maxAcceleration = random(.2,3);
    this.minAcceleration = .01;
    this.acceleration = this.maxAcceleration;
    this.xTarget;
    this.yTarget;
    this.minMaxRange = 10;
    this.size = random(20,100);

    let mM = this.minMaxRange;
    this.xSlider = createSlider(-PI, PI, 0, TWO_PI/60);
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
    this.noiseXIndex += this.noiseIncrement;
    this.noiseYIndex += this.noiseIncrement;
    const xT1 = noise(this.noiseXIndex) * windowWidth;;
    const yT1 = noise(this.noiseYIndex) * windowHeight;

    const xT2 = mouseX;
    const yT2 = mouseY;

    this.xTarget = (xT1+xT2)/2;
    this.yTarget = (yT1+yT2)/2;
    // this.xTarget = mouseX;
    // this.yTarget = mouseY;
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
    const distFromTarget = sqrt(sq(xVecToTarget)+sq(yVecToTarget));
    const maxAccelerationDist = 20;
    //if dist is larger than threshold acceleration is maxed
    if (distFromTarget > maxAccelerationDist){
      this.acceleration = this.maxAcceleration;
    } else { //otherwise it is maxed at outter ring of threshold and 0 when dist = 0
      this.acceleration = (distFromTarget/maxAccelerationDist);
      this.acceleration = constrain(this.acceleration,this.minAcceleration,this.maxAcceleration);
    }

    const angleToTarget = atan2(yVecToTarget,xVecToTarget);
    this.angle = atan2(this.yVec,this.xVec);
    // console.log(currentAngle);
    let desiredChangeInAngle;
    if (abs(angleToTarget-this.angle) < PI) {
      desiredChangeInAngle = angleToTarget-this.angle;
    } else { //makes sure if rotating counterclockwise is shortest way to achieve desired angle
        desiredChangeInAngle = -(angleToTarget-this.angle);
    }
    const newAngle = this.angle + (desiredChangeInAngle*this.angularAcceleration);

    //correct the angle when

    this.xVec = cos(newAngle) * this.acceleration;
    this.yVec = sin(newAngle) * this.acceleration;

    // this.xVec = xVecToTarget;
    // this.yVec = yVecToTarget;
    // console.log();
    //calc vector, normalize vector, recalc vecs

  }
  updateAcceleration(){
    //slows it down once past radius
    // xVecToTarget = this.x-
    // distFromTarget = sqrt(sq(xVecToTarget)+sq(yVecToTarget));
  }
  updatePositionBasedOnVectors(){
    this.x += this.xVec;
    this.y += this.yVec;

    if (this.radio.value() === true){
      this.radio.style("display","none");
    }

  }
  display(){
    // const sliderXValue = map(this.x,0,windowWidth,-this.minMaxRange,this.minMaxRange);
    const btnRadius = 4;
    this.xSlider.value(this.angle);
    this.xSlider.style('left', this.x-btnRadius-this.size/2+"px");
    this.xSlider.style('top', this.y+38+"px");

    this.ySlider.style('left', this.x+"px");
    this.ySlider.style('top', this.y+"px");
    this.radio.style('left', this.x-btnRadius+"px");
    this.radio.style('top', this.y+16+btnRadius+"px");
  }

}
