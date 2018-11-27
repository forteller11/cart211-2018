class Creature {
  constructor(){
    this.x = random(windowWidth);
    this.y = random(windowHeight);

    this.minMaxRange = 10;
    this.size = random(60,100);
    this.sliderHeight = this.size/10;
    this.radioRadius = this.size/6;
    this.nameSize = this.size/2;
    this.nameID = random(1);
    this.radioAliveDead = random(1);

    this.velocity = createVector(0,0); //vector to be used as velocity.
    this.velocityMax = 5; //max mag of velocity vec
    this.desiredVelocity = []; //an array of desired velocities to be added to velocity
    this.desiredVelocityWeight = []; //the weights of the desired velocities to change how they're added together

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
    this.fontSize = this.size/10;
    //this is more or less creating html elements in js
    let bodyPointer = document.getElementById("bod");
      this.div = this.createElement("div",divID,bodyPointer);
        this.sliderHorz = this.createElement("INPUT",sliderHorzID,this.div);
        this.sliderVert = this.createElement("INPUT",sliderHorzID,this.div);
        this.name = this.createElement("INPUT",nameID,this.div);
        this.radioAliveContainer = this.createElement("div",divID,this.div);
          // this.radioAlive = this.createElement("INPUT",radioAliveID,this.radioAliveContainer);
          this.radioAliveContainer.innerHTML = "alive";
        this.radioDeadContainer = this.createElement("div",divID,this.div);
          // this.radioDead = this.createElement("INPUT",radioAliveID,this.radioDeadContainer);
          this.radioDeadContainer.innerHTML = "dead";

    // this is basically styling those html elements in css using js
    //divider containing all entity elements
    this.div.style.width = "auto";
    this.div.style.height = "auto";
    this.transformElement(this.div,0,0,"px");

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
      this.name.setAttribute("value", "bobby");
      this.sizeElement(this.name,this.nameSize,this.nameSize/2.5,"px");
      this.transformElement(this.name,this.nameSize/2,-this.size/1.8,"px");
      this.name.style.fontSize = this.fontSize+"px";
      this.name.style.textAlign = "center";

      //aliveRadio divider
      this.radioAliveContainer.style.width = "auto";
      this.radioAliveContainer.style.height = "auto";
      this.transformElement(this.radioAliveContainer,this.size,-this.size/6,"px");

        //radioALive
        this.radioAlive = this.createElement("INPUT",radioAliveID,this.radioAliveContainer);
        this.radioAlive.setAttribute("type", "radio");
        this.radioAlive.setAttribute("name", radioGroupID);
        this.radioAlive.setAttribute("id", radioAliveID);
        this.radioAlive.checked = true;
        this.transformElement(this.radioAlive,-this.fontSize*4,-this.fontSize,"px");
        this.sizeElement(this.radioAlive,this.radioRadius*2,this.radioRadius*2,"px");

      //RadioDeadContianer
      this.radioDeadContainer.style.width = "auto";
      this.radioDeadContainer.style.height = "auto";
      this.transformElement(this.radioDeadContainer,this.size,this.size/2.8,"px");

        //radioDead
        this.radioDead = this.createElement("INPUT",radioAliveID,this.radioDeadContainer);
        this.radioDead.setAttribute("type", "radio");
        this.radioDead.setAttribute("name", radioGroupID);
        this.radioDead.setAttribute("id", radioDeadID);
        // this.radioDead.setAttribute("value", name);
        this.radioDead.checked = false;
        this.transformElement(this.radioDead,-this.fontSize*4,-this.fontSize/2,"px");
        this.sizeElement(this.radioDead,this.radioRadius*2,this.radioRadius*2,"px");

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

  seek(){ //travel towards point
    const targetX = mouseX;
    const targetY = mouseY;
    let vectorToTarget = createVector(targetX-this.x,targetY-this.y);

    //VectorToTarget - this.velocity (finds differences in two vectors, or vector which takes velocityvector to vecToTarget)
    let desiredChangeInVelocity = p5.Vector.sub(vectorToTarget,this.velocity);
    // console.log(desiredChangeInVelocity);

    let addToVelocity = desiredChangeInVelocity.limit(1); //
    this.velocity.add(addToVelocity);

  }
  addVelocityToPosition(){
    this.velocity.limit(this.velocityMax);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
  seperate(){

  }

  updatePositionOfElements(){
    let xOffset = this.size/1.7;
    let yOffset = this.size/4;
    this.transformElement(this.div, this.x, this.y, "px");
  }

  update(){
    this.seek();
    this.addVelocityToPosition();

    this.updatePositionOfElements();
  }

}
