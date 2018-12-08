let head;

function setup(){
  // createCanvas(windowWidth,windowHeight);
  head = new Head("exercises/class2/index.html","class 2");


  head.update();

}
function draw(){
head.update();
createCanvas(500,500);
background(255,0,0);

}



class Head {
  constructor(link,linkName){
    const explosionAmount = 100; //lower values = more initial explosion
    this.x = random(windowWidth/2-explosionAmount,windowWidth/2+explosionAmount);
    this.y = random(windowHeight/2-explosionAmount,windowHeight/2+explosionAmount);
    this.wanderXIndex = random(100000);
    this.wanderYIndex = random(100000);
    this.size = 80;
    this.velocity = createVector(random(-this.velocityMax,this.velocityMax), random(-this.velocityMax,this.velocityMax)); //vector to be used as velocity.

    let bodyPointer = document.getElementById("bodyID")
    const hrefContainerID = random(1);
    this.hrefContainer = this.createElement("div",hrefContainerID,bodyPointer);

    const hrefID = random(1);
    this.href = this.createElement("a",hrefID,this.hrefContainer);
    this.href.setAttribute("href",link);
    this.href.setAttribute("target","_blank");
    this.transformElement(this.href, 0, 0, "px");
    this.href.innerHTML = linkName;
    console.log(this.href);


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

  seperate(weight) {
      let sumDistToheads = createVector(0, 0);
      let headsWithinRadius = 0;
      const seperationThreshold = this.size* 2;
      for (let i = 0; i < heads.length; i++) {
        const distToheads = createVector(this.x - heads[i].x, this.y - heads[i].y);
        if (distToheads.mag() < seperationThreshold) { //if within radius, record it, add to summ
          headsWithinRadius++;
          const magBasedOnDist = map(distToheads.mag(), 0, seperationThreshold, 250, 0);
          distToheads.normalize();
          const addToSum = distToheads.mult(magBasedOnDist);
          sumDistToheads.add(distToheads);
        }
      }
      let avgDistToheads = sumDistToheads.div(headsWithinRadius);
      let vectorToTarget = avgDistToheads;

      //VectorToTarget - this.velocity (finds differences in two vectors, or vector which takes velocityvector to vecToTarget)
      let desiredChangeInVelocity = p5.Vector.sub(vectorToTarget, this.velocity);

      const distToTarget = vectorToTarget.mag();

      let addToVelocity = desiredChangeInVelocity.mult(weight);

        // stroke(0, 0, 255, 40);
        // noFill();
        // // ellipse(this.x, this.y, seperationThreshold);
        // stroke(0, 0, 255);
        // line(this.x, this.y, this.x + addToVelocity.x, this.y + addToVelocity.y);


      this.velocity.add(addToVelocity);
      //away from neighby x/y positions
    }

    clump(weight) {
    let sumDistToheads = createVector(0, 0);
    let headsWithinRadius = 0;
    const radiusThreshold = this.size*4;
    for (let i = 0; i < heads.length; i++) {
      const distTohead = createVector(heads[i].x - this.x, heads[i].y - this.y);
      if (distTohead.mag() < radiusThreshold) { //if within radius, record it, add to summ
        headsWithinRadius++;
        sumDistToheads.add(distTohead);
      }
    }
    const avgDistToheads = sumDistToheads.div(headsWithinRadius);
    let vectorToTarget = avgDistToheads;

    //VectorToTarget - this.velocity (finds differences in two vectors, or vector which takes velocityvector to vecToTarget)
    let desiredChangeInVelocity = p5.Vector.sub(vectorToTarget, this.velocity);

    const distToTarget = vectorToTarget.mag();

    let addToVelocity = desiredChangeInVelocity.mult(weight); //

      // stroke(0, 255, 255, 40);
      // noFill();
      // ellipse(this.x, this.y, radiusThreshold);
      // stroke(0, 255, 255);
      // line(this.x, this.y, this.x + addToVelocity.x, this.y + addToVelocity.y);

    this.velocity.add(addToVelocity);
    //away from neighby x/y positions
  }

    wander(weight) { //use 2d perlin noise to create random point within unit circle
        const noiseIncrement = .002;
        this.wanderXIndex += noiseIncrement;
        this.wanderYIndex += noiseIncrement;
        let xTarget = ((noise(this.wanderXIndex)*2)-1)*this.size;
        let yTarget = ((noise(this.wanderYIndex)*2)-1)*this.size;
        // ellipse(this.x+xTarget,this.y+yTarget,5);
        let vectorToTarget = createVector(xTarget,yTarget);

        //VectorToTarget - this.velocity (finds differences in two vectors, or vector which takes velocityvector to vecToTarget)
        let desiredChangeInVelocity = p5.Vector.sub(vectorToTarget, this.velocity);

        const distToTarget = vectorToTarget.mag();

        let addToVelocity = desiredChangeInVelocity.mult(weight*.01);


          // stroke(0, 0, 255);
          // line(this.x, this.y, this.x + addToVelocity.x, this.y + addToVelocity.y);


        this.velocity.add(addToVelocity);
        //away from neighby x/y positions
      }

      seekCenter(weight) { //travel towards point
          const targetX = windowWidth/2;
          const targetY = windowHeight/2;
          let vectorToTarget = createVector(targetX - this.x, targetY - this.y);

          //VectorToTarget - this.velocity (finds differences in two vectors, or vector which takes velocityvector to vecToTarget)
          let desiredChangeInVelocity = p5.Vector.sub(vectorToTarget, this.velocity);

          // console.log(desiredChangeInVelocity);
          const distToTarget = vectorToTarget.mag();
          // this.velocityWeight = map(distToTarget,0,windowWidth,0,.01);
          // this.velocityWeight = constrain(this.velocityWeight,0,.01);
          this.velocityWeight = .0001;
          // console.log(this.velocityWeight);
          // this.velocityWeight = this.velocityWeight * this.velocityWeightConstant;

          let addToVelocity = desiredChangeInVelocity.mult(weight); //
          // stroke(255, 0, 255);
          // line(this.x, this.y, this.x + addToVelocity.x, this.y + addToVelocity.y);
          // addToVelocity.mult(this.velocityWeight);
          // console.log(addToVelocity);
          this.velocity.add(addToVelocity);
        }
  updatePositionOfElements() {
    let xOffset = this.size / 1.7;
    let yOffset = this.size / 4;
    this.transformElement(this.hrefContainer, this.x-this.size/2, this.y, "px");

    this.transformElement(this.href, 0, 0, "px");

  }

  addVelocityToPosition() {
    this.velocity.limit(this.velocityMax);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  update() {
    // ellipse(this.x,this.y,this.size);
    this.seekCenter(.0003);
    // this.clump(.0001);
    this.seperate(.05);
    this.wander(.14);

    // this.maintainDistance(.01,this.distToMaintain);
    this.addVelocityToPosition();
    this.screenWrap();
    this.updatePositionOfElements();
  }
}
