class Head {
  constructor(){
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.wanderXIndex = random(100000);
    this.wanderYIndex = random(100000);
    this.size = 100;
    this.velocity = createVector(random(-this.velocityMax,this.velocityMax), random(-this.velocityMax,this.velocityMax)); //vector to be used as velocity.

    let bodyPointer = document.getElementById("bodyID")
    const hrefID = random(1);
    this.href = this.createElement("a",hrefID,bodyPointer);
    this.href.setAttribute("href","https://www.youtube.com/"+round(random(100)));
    this.href.setAttribute("target","_blank");
    this.href.style.width = "100px";
    this.href.style.height = "100px";
    this.transformElement(this.href, 0, 0, "px");
    this.href.innerHTML = "youtube.com/"+round(random(100));
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

    wander(weight) { //use 2d perlin noise to create random point within unit circle
        const noiseIncrement = .01;
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


          stroke(0, 0, 255);
          line(this.x, this.y, this.x + addToVelocity.x, this.y + addToVelocity.y);


        this.velocity.add(addToVelocity);
        //away from neighby x/y positions
      }


  updatePositionOfElements() {
    let xOffset = this.size / 1.7;
    let yOffset = this.size / 4;
    this.transformElement(this.href, this.x-this.size/2, this.y, "px");
  }

  addVelocityToPosition() {
    this.velocity.limit(this.velocityMax);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  update() {
    // ellipse(this.x,this.y,this.size);
    // this.seekMouse(0.0001);
    // this.align(.1);
    // this.clump(.001);
    this.seperate(.01);
    this.wander(.1);

    // this.maintainDistance(.01,this.distToMaintain);
    this.addVelocityToPosition();
    this.screenWrap();
    this.updatePositionOfElements();
  }
}
