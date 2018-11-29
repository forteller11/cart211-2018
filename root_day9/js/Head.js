class Head {
  constructor(){
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.velocity = createVector(random(-this.velocityMax,this.velocityMax), random(-this.velocityMax,this.velocityMax)); //vector to be used as velocity.

    let bodyPointer = document.getElementById("bodyID")
    const videoContainerID = random(1);
    this.videoContainer = this.createElement("div",videoContainerID,bodyPointer);

    const videoID = random(1);
    this.video = this.createElement("video",videoID,this.videoContainer);
  }
  createElement(typeOfElement, id, pointerOfParent) {
    //parentID where to appendto
    let elementPointer = document.createElement(typeOfElement);
    elementPointer.setAttribute("id", id);
    pointerOfParent.appendChild(elementPointer);
    elementPointer.style.position = "absolute";
    // divPointer.style.width = "auto";
    // divPointer.style.height = "auto";
    // this.transformElement(divPointer,this.x,this.y,"px");
    // console.log(divPointer);
    return elementPointer;
  }

  transformElement(elementPointer, xTransform, yTransform, transformType) {
    //element pointer is what html elemnt to change style of
    //x transform changes left: positions
    //y transform changes top: position
    //transfform type will be either "px" or "%" etc. based on what kind of transformation user wants to occur
    elementPointer.style.left = xTransform + transformType;
    elementPointer.style.top = yTransform + transformType;
  }

  sizeElement(elementPointer, width, height, sizeType) {
    //element pointer is what html elemnt to change style of
    //x transform changes left: positions
    //y transform changes top: position
    //transfform type will be either "px" or "%" etc. based on what kind of transformation user wants to occur
    elementPointer.style.width = width + sizeType;
    elementPointer.style.height = height + sizeType;
  }

  screenWrap() {
    if (this.x - this.size > windowWidth) {
      this.x = -this.size;
    } else if (this.x + this.size < 0) {
      this.x = windowWidth + this.size;
    }
    if (this.y - this.size > windowHeight) {
      this.y = -this.size;
    } else if (this.y + this.size < 0) {
      this.y = windowHeight + this.size;
    }
  }

  updatePositionOfElements() {
    let xOffset = this.size / 1.7;
    let yOffset = this.size / 4;
    this.transformElement(this.videoContainer, this.x, this.y, "px");
  }

  addVelocityToPosition() {
    this.velocity.limit(this.velocityMax);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  update() {
    // this.seekMouse(0.0001);
    // this.align(.1);
    // this.clump(.001);
    // this.seperate(.01);

    // this.maintainDistance(.01,this.distToMaintain);
    this.addVelocityToPosition();
    this.screenWrap();
    this.updatePositionOfElements();
  }
}
