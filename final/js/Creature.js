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
    this.angularAcceleration = random(.01,.1);
    this.maxAcceleration = random(.05,1);
    this.minAcceleration = .01;
    this.acceleration = this.maxAcceleration;
    this.xTarget;
    this.yTarget;
    this.minMaxRange = 10;
    this.size = random(20,100);
    this.sliderHeight = this.size/10;
    this.radioRadius = this.size/6;
    this.radioAliveDead = random(1000000);

    // this.radio.style('position', 'fixed');
    // this.radio.style('left', this.x+"px");
    // this.radio.style('top', this.y+"px");
    // this.radio.style('width', 100+"%");
    // this.radio.style('height', this.size+"px");
    // this.radio.style('transform', "scale("+this.size/40+")");

    this.sliderHorz = this.createSlider(this.sliderHorz,0);
    this.sliderVert = this.createSlider(this.sliderVert,90);

    this.radioAlive = this.createRadio('alive',this.radioAliveDead,"alive");
    this.radioDead = this.createRadio('dead',this.radioAliveDead,"dead");
  }
  createSlider(name,rotate){
    name = document.createElement("INPUT");
    name.setAttribute("type", "range");
    name.setAttribute("min", -1 );
    name.setAttribute("max", 1 );
    name.setAttribute("step", 2/this.size );
    name.textContent = 'ah';
    let body = document.getElementById('bod');
    body.appendChild(name);
    name.style.position = "absolute";
    this.transformSlider(name);
    name.style.width = this.size+"px";
    name.style.height = this.sliderHeight+"px";
    name.style.transform = "rotate("+rotate+"deg)";
      // console.log(name);
    return name;
  }
  createRadio(id, name, value){
    id = document.createElement("INPUT");
    id.setAttribute("type", "radio");
    id.setAttribute("name", name);
    id.setAttribute("id", id);
    id.setAttribute("value", name);
    id.textContent = value;

    let body = document.getElementById('bod');
    body.appendChild(id);
    id.style.position = "absolute";
    this.transformRadio(id);
    id.style.width = this.radioRadius*2+"px";
    id.style.height = this.radioRadius*2+"px";
    console.log(id);
    return id;
  }
  transformRadio(id,xOff,yOff){
    id.style.left = xOff+this.x+(this.size/2)-this.radioRadius+"px";
    id.style.top = yOff+this.y+"px";
  }
  transformSlider(name,xOff,yOff){
    name.style.left = this.x+"px";
    name.style.top = this.y+(this.sliderHeight*1.5)+"px"
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
    this.xTarget = mouseX;
    this.yTarget = mouseY;
    this.xTarget = xT1;
    this.yTarget = yT1;
  }
  updateVectors(){
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
    this.sliderHorz.value = cos(newAngle);
    this.sliderVert.value = sin(newAngle);

  }
  updateAcceleration(){
    //slows it down once past radius
    // xVecToTarget = this.x-
    // distFromTarget = sqrt(sq(xVecToTarget)+sq(yVecToTarget));
  }
  updatePositionBasedOnVectors(){
    this.x += this.xVec;
    this.y += this.yVec;

    // if (this.radio.value() === true){
    //   this.radio.style("display","none");
    // }

  }
  display(){
    let xOffset = this.size/4;
    let yOffset = this.size/4;
    this.transformRadio(this.radioAlive,xOffset,yOffset);
    this.transformRadio(this.radioDead,xOffset,-yOffset);
    this.transformSlider(this.sliderHorz);
    this.transformSlider(this.sliderVert);

    // this.radio.style('left', this.x-btnRadius+"px");
    // this.radio.style('top', this.y+16+btnRadius+"px");
  }

}
