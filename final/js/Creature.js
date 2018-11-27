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
    this.nameSize = this.size/2;
    this.nameID = random(1);
    this.radioAliveDead = random(1);

    // this.radio.style('position', 'fixed');
    // this.radio.style('left', this.x+"px");
    // this.radio.style('top', this.y+"px");
    // this.radio.style('width', 100+"%");
    // this.radio.style('height', this.size+"px");
    // this.radio.style('transform', "scale("+this.size/40+")");
    const divID = random(1); //set random divID
    const nameID = random(1);
    const sliderHorzID = random(1);
    const sliderVertID = random(1);
    const radioGroupID = random(1);
    const radioAliveContainerID = random(1);
    const radioAliveID = random(1);
    const radioDeadContainerID = random(1);
    const radioDeadID = random(1);

    //this is more or less creating html elements in js
    let bodyPointer = document.getElementById("bod");
      this.div = this.createElement("div",divID,bodyPointer);
        this.sliderHorz = this.createElement("INPUT",sliderHorzID,this.div);
        this.sliderVert = this.createElement("INPUT",sliderHorzID,this.div);
        this.name = this.createElement("INPUT",nameID,this.div);
        this.radioAliveContainer = this.createElement("div",divID,bodyPointer);
          this.radioAlive = this.createElement("INPUT",radioAliveID,this.radioAliveContainer);
          this.radioAliveContainer.innerHTML("ALIVE");
        this.radioDeadContainer = this.createElement("div",divID,bodyPointer);
          this.radioDead = this.createElement("INPUT",radioAliveID,this.radioDeadContainer);
          this.radioDeadContainer.innerHTML("DEAD");

    // this is basically styling those html elements in css using js
    //divider containing all entity elements
    this.div.style.width = "auto";
    this.div.style.height = "auto";
    this.transformElement(this.div,this.x,this.y,"px");

      //horizontal slider
      this.sliderHorz.setAttribute("type", "range");
      this.sliderHorz.setAttribute("min", -1 );
      this.sliderHorz.setAttribute("max", 1 );
      this.sliderHorz.setAttribute("step", 2/this.size);
      this.sizeElement(this.sliderHorz,this.size,this.sliderHeight,"px");
      this.transformElement(this.sliderHorz,0,(this.sliderHeight*1.5),"px");
      this.sliderHorz.style.transform = "rotate("+0+"deg)";

      //vertical slider
      this.sliderVert.setAttribute("type", "range");
      this.sliderVert.setAttribute("min", -1 );
      this.sliderVert.setAttribute("max", 1 );
      this.sliderVert.setAttribute("step", 2/this.size);
      this.sizeElement(this.sliderVert,this.size,this.sliderHeight,"px");
      this.transformElement(this.sliderVert,0,(this.sliderHeight*1.5),"px");
      this.sliderVert.style.transform = "rotate("+90+"deg)";

      //name (text input)
      this.name.setAttribute("type", "text");
      this.name.setAttribute("name", nameID);
      name.setAttribute("value", "bobby");
      this.sizeElement(this.name,this.nameSize,this.nameSize/2.5,"px");
      this.transformElement(this.name,this.nameSize,this.nameSize/2.5,"px");
      this.name.style.fontSize = this.size/10+"px";
      //
      this.sizeElement(this.radioAliveContainer


      let div = document.getElementById(this.divID);
      this.div.appendChild(name);
      name.style.position = "absolute";
      this.transformText(name);
      name.style.fontSize = this.size/10+"px";
      name.style.width = this.nameSize+"px";
      name.style.height = this.nameSize/2.5+"px";


    this.sliderHorz = this.createSlider(sliderHorzID,0);
    this.sliderVert = this.createSlider(sliderVertID,90);
    this.radioDead = this.createRadio('dead',radioGroupID,"dead");
    this.radioAlive = this.createRadio('alive',radioGroupID,"alive");
    this.name = this.createText(nameID,'todd');
  }
  createElement(typeOfElement, id,pointerOfParent){
    //parentID where to appendto
    let elementPointer = document.createElement(typeOfElement);
    elementPointer.setAttribute("id",id);
    pointerOfParent.appendChild(elementPointer);
    elementPointer.style.position = "absolute";
    // divPointer.style.width = "auto";
    // divPointer.style.height = "auto";
    // this.transformElement(divPointer,this.x,this.y,"px");
    // console.log(divPointer);
    return elementPointer;
  }

  transformElement(elementPointer,xTransform,yTransform,transformType){
    //element pointer is what html elemnt to change style of
    //x transform changes left: positions
    //y transform changes top: position
    //transfform type will be either "px" or "%" etc. based on what kind of transformation user wants to occur
  elementPointer.style.left = xTransform+transformType;
  elementPointer.style.top = yTransform+transformType;
  }
  sizeElement(elementPointer,width,height,sizeType){
    //element pointer is what html elemnt to change style of
    //x transform changes left: positions
    //y transform changes top: position
    //transfform type will be either "px" or "%" etc. based on what kind of transformation user wants to occur
  elementPointer.style.width = width+sizeType;
  elementPointer.style.height = height+sizeType;
  }
  createSlider(name,rotate){
    name = document.createElement("INPUT");
    name.setAttribute("type", "range");
    name.setAttribute("min", -1 );
    name.setAttribute("max", 1 );
    name.setAttribute("step", 2/this.size );
    name.textContent = 'ah';
    this.div.appendChild(name);
    name.style.position = "absolute";
    this.transformSlider(name);
    name.style.width = this.size+"px";
    name.style.height = this.sliderHeight+"px";
    name.style.transform = "rotate("+rotate+"deg)";
      // console.log(name);
    return name;
  }
  createText(name,value){
    name = document.createElement("INPUT");
    name.setAttribute("type", "text");
    name.setAttribute("name", name);
    name.setAttribute("value", value);
    let div = document.getElementById(this.divID);
    this.div.appendChild(name);
    name.style.position = "absolute";
    this.transformText(name);
    name.style.fontSize = this.size/10+"px";
    name.style.width = this.nameSize+"px";
    name.style.height = this.nameSize/2.5+"px";
    return name;
  }

  createRadio(id, name, value){
    id = document.createElement("INPUT");
    id.setAttribute("type", "radio");
    id.setAttribute("name", name);
    id.setAttribute("id", id);
    id.setAttribute("value", name);
    id.setAttribute("checked", true);

    let div = document.getElementById(this.divID);
    this.div.appendChild(id);
    id.style.position = "absolute";
    this.transformRadio(id);
    id.style.width = this.radioRadius*2+"px";
    id.style.height = this.radioRadius*2+"px";
        id.innerHTML = "aDQWDWQDWQQWDSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADWDQh";
    // console.log(id);
    return id;
  }
  transformText(elementPointer){
    elementPointer.style.left = (this.nameSize/2)+"px";
    elementPointer.style.top = -this.size/3+"px";
  }
  transformRadio(id,xOff,yOff){
    id.style.left = xOff+(this.size/2)-this.radioRadius+"px";
    id.style.top = yOff+"px";
  }
  transformSlider(name,xOff,yOff){
    name.style.left = 0+"px";
    name.style.top = 0+(this.sliderHeight*1.5)+"px"
  }

  updateTarget(){
    this.noiseXIndex += this.noiseIncrement;
    this.noiseYIndex += this.noiseIncrement;
    const xT1 = noise(this.noiseXIndex) * windowWidth;
    const yT1 = noise(this.noiseYIndex) * windowHeight;

    const xT2 = mouseX;
    const yT2 = mouseY;

    this.xTarget = (xT1+xT2)/2;
    this.yTarget = (yT1+yT2)/2;
    // this.xTarget = mouseX;
    // this.yTarget = mouseY;
    // this.xTarget = xT1;
    // this.yTarget = yT1;
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

  updatePositionBasedOnVectors(){
    this.x += this.xVec;
    this.y += this.yVec;

  }

  transformText(elementPointer){
    elementPointer.style.left = (this.nameSize/2)+"px";
    elementPointer.style.top = -this.size/3+"px";
  }
  transformRadio(id,xOff,yOff){
    id.style.left = xOff+(this.size/2)-this.radioRadius+"px";
    id.style.top = yOff+"px";
  }
  transformSlider(name,xOff,yOff){
    name.style.left = 0+"px";
    name.style.top = 0+(this.sliderHeight*1.5)+"px"
  }
  updatePositionOfElements(){
    let xOffset = this.size/1.7;
    let yOffset = this.size/4;
    this.transformElement(this.div,this.x,this.y,"px");
      this.transformElement(this.name,(this.nameSize/2),-this.size/3,"px");
      this.transformElement(this.radioAlive,xOffset,-yOffset,"px");
      this.transformElement(this.radioDead,xOffset,yOffset,"px");
      this.transformElement(this.name,(this.nameSize/2),-this.size/3,"px");
      // this.transformRadio(this.radioAlive,xOffset,-yOffset);
      // this.transformRadio(this.radioDead,xOffset,yOffset);
      // this.transformSlider(this.sliderHorz);
      // this.transformSlider(this.sliderVert);
  }
  update(){
    this.updateTarget();
    this.updateVectors();
    this.updatePositionBasedOnVectors();
    this.updatePositionOfElements();
  }

}
