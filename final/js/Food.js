class Food {
  constructor() {
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.size = random(10,25);

    const radioID = random(1);
    const radioGroupID = random(1);
    const bodyPointer = document.getElementById("bod");
    this.radio = this.createElement("INPUT", radioID, bodyPointer);
    this.radio.setAttribute("type", "radio");
    this.radio.setAttribute("name", radioGroupID);
    this.radio.setAttribute("id", radioID);
    if (radioID > .5) {this.radio.checked = true;}
    this.transformElement(this.radio, this.x, this.y, "px");
    this.sizeElement(this.radio, this.size, this.size, "px");
    if (style === false) {
      this.radio.style.display = "none";
    }

    // console.log(this.radio);
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

  update(){
    // console.log("hello");
    stroke(0,255,0);
    ellipse(this.x,this.y,this.size);
  }
}
