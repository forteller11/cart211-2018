class Creature {
  constructor(size,nameGen) {
    this.seekMouseWeight = 1;
    this.clumpWeight = random(-0.05, 0.05);
    this.clumpMutationRate = random(-0.02, 0.02);

    this.clumpRadius = random(1,6);
    this.clumpRadiusMutationRate = random(-.3,.3);
    this.clumpRadius = constrain(this.clumpRadius,1,100);
    this.seperateWeight = 0.3;

    this.wanderWeight = random(1);
    this.wanderMutationRate = random(-0.1, 0.1);

    this.seekFoodWeight = random(-0.001, 0.001);
    this.seekFoodMutationRate = random(-0.0005, 0.0005);

    this.size = size;
    this.sizeMutationRate = random(-5,5);
    if (this.size < 20){this.size = 20;}

    this.food = 1;
    this.hungerRate = 0.005;
    const randomName = floor(random(names.length));
    this.nameValue = names[randomName];
    this.nameValueGeneration = nameGen; //generation of creature

    this.wanderXIndex = random(100000);
    this.wanderYIndex = random(100000);
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.minMaxRange = 10;

    this.sliderHeight = this.size / 10;
    this.radioRadius = this.size / 6;
    this.nameSize = this.size / 1.5;
    this.nameID = random(1);
    this.radioAliveDead = random(1);
    this.distToMaintain = random(100, 250);
    this.velocityMax = random(100 / this.size, 1000 / this.size); //max mag of velocity vec
    this.velocity = createVector(random(-this.velocityMax, this.velocityMax), random(-this.velocityMax, this.velocityMax)); //vector to be used as velocity.
    this.velocityWeight;
    this.velocityWeightConstant = 1; //dna of weight
    this.sliderIndex = random(TWO_PI); //where the slider is in its osscilattions
    this.sliderIndexIncrementConstant = random(.5, 1.5);
    const divID = random(1); //set random divID
    const nameID = random(1);
    const sliderHorzID = random(1);
    const sliderVertID = random(1);
    const radioGroupID = random(1);
    const radioAliveContainerID = random(1);
    const radioAliveID = random(1);
    const radioDeadContainerID = random(1);
    const radioDeadID = random(1);
    this.fontSize = this.size / 10;
    //this is more or less creating html elements in js
    let bodyPointer = document.getElementById("bod");
    this.div = this.createElement("div", divID, bodyPointer);
    this.sliderHorz = this.createElement("INPUT", sliderHorzID, this.div);
    this.sliderVert = this.createElement("INPUT", sliderHorzID, this.div);
    this.name = this.createElement("INPUT", nameID, this.div);
    this.radioAliveContainer = this.createElement("div", divID, this.div);
    // this.radioAlive = this.createElement("INPUT",radioAliveID,this.radioAliveContainer);
    this.radioAliveContainer.innerHTML = "alive";
    this.radioDeadContainer = this.createElement("div", divID, this.div);
    // this.radioDead = this.createElement("INPUT",radioAliveID,this.radioDeadContainer);
    this.radioDeadContainer.innerHTML = "dead";

    // this is basically styling those html elements in css using js
    //divider containing all entity elements
    this.div.style.width = "auto";
    this.div.style.height = "auto";
    this.transformElement(this.div, 0, 0, "px");


    const sliderSize = this.size;
    //horizontal slider
    this.sliderHorz.setAttribute("type", "range");
    this.sliderHorz.setAttribute("min", -1);
    this.sliderHorz.setAttribute("max", 1);
    this.sliderHorz.setAttribute("step", 1 / this.size);
    this.sizeElement(this.sliderHorz, sliderSize, this.sliderHeight, "px");
    this.transformElement(this.sliderHorz, 0, (this.sliderHeight * 1.5), "px");
    this.sliderHorz.style.transform = "rotate(" + 0 + "deg)";
    if (style === false) {
      this.sliderHorz.style.display = "none";
    }
    //vertical slider
    this.sliderVert.setAttribute("type", "range");
    this.sliderVert.setAttribute("min", -1);
    this.sliderVert.setAttribute("max", 1);
    this.sliderVert.setAttribute("step", 1 / this.size);
    this.sizeElement(this.sliderVert, sliderSize, this.sliderHeight, "px");
    this.transformElement(this.sliderVert, 0, (this.sliderHeight * 1.5), "px");
    this.sliderVert.style.transform = "rotate(" + 180 + "deg)";
    if (style === false) {
      this.sliderVert.style.display = "none";
    }

    //name (text input)
    this.name.setAttribute("type", "text");
    this.name.setAttribute("name", nameID);
    this.name.setAttribute("value",this.nameValue+"_"+this.nameValueGeneration);
    this.sizeElement(this.name, this.nameSize, this.nameSize / 2.5, "px");
    this.transformElement(this.name, this.nameSize / 3.2, -this.nameSize / 1.1, "px");
    this.name.style.fontSize = this.fontSize + "px";
    this.name.style.textAlign = "center";
    if (style === false) {
      this.name.style.display = "none";
    }

    //aliveRadio divider
    this.radioAliveContainer.style.width = "auto";
    this.radioAliveContainer.style.height = "auto";
    this.transformElement(this.radioAliveContainer, this.size, -this.size / 6, "px");
    if (style === false) {
      this.radioAliveContainer.style.display = "none";
    }


    //radioALive
    this.radioAlive = this.createElement("INPUT", radioAliveID, this.radioAliveContainer);
    this.radioAlive.setAttribute("type", "radio");
    this.radioAlive.setAttribute("name", radioGroupID);
    this.radioAlive.setAttribute("id", radioAliveID);
    this.radioAlive.checked = true;
    this.transformElement(this.radioAlive, -this.fontSize * 4, -this.fontSize, "px");
    this.sizeElement(this.radioAlive, this.radioRadius * 2, this.radioRadius * 2, "px");
    if (style === false) {
      this.radioAlive.style.display = "none";
    }

    //RadioDeadContianer
    this.radioDeadContainer.style.width = "auto";
    this.radioDeadContainer.style.height = "auto";
    this.transformElement(this.radioDeadContainer, this.size, this.size / 2.8, "px");
    if (style === false) {
      this.radioDeadContainer.style.display = "none";
    }

    //radioDead
    this.radioDead = this.createElement("INPUT", radioAliveID, this.radioDeadContainer);
    this.radioDead.setAttribute("type", "radio");
    this.radioDead.setAttribute("name", radioGroupID);
    this.radioDead.setAttribute("id", radioDeadID);
    // this.radioDead.setAttribute("value", name);
    this.radioDead.checked = false;
    this.transformElement(this.radioDead, -this.fontSize * 4, -this.fontSize / 2, "px");
    this.sizeElement(this.radioDead, this.radioRadius * 2, this.radioRadius * 2, "px");
    if (style === false) {
      this.radioDead.style.display = "none";
    }
    this.radioAlive.style.display = "none";
    this.radioDead.style.display = "none";
    this.radioAliveContainer.style.display = "none";
    this.radioDeadContainer.style.display = "none";
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

  seekMouse(weight) { //travel towards point
    if (mouseIsPressed) {
      const targetX = mouseX;
      const targetY = mouseY;
      let vectorToTarget = createVector(targetX - this.x, targetY - this.y);
      const distToTarget = vectorToTarget.mag();

      vectorToTarget.div(sq(distToTarget) / 1000);
      vectorToTarget.limit(7);
      //VectorToTarget - this.velocity (finds differences in two vectors, or vector which takes velocityvector to vecToTarget)
      let desiredChangeInVelocity = p5.Vector.sub(vectorToTarget, this.velocity);


      let addToVelocity = desiredChangeInVelocity.mult(weight); //
      if (debugDisplay) {
        stroke(255, 0, 255);
        line(this.x, this.y, this.x + addToVelocity.x, this.y + addToVelocity.y);
      }

      this.velocity.add(addToVelocity);
    }
  }

  seekFood(weight) { //travel towards point
    if (food.length > 0) {
      //find closest food, as target, if there is no food, return force of 0,0
      let closestFoodDist = Infinity;
      let closestFood;
      let closestFoodIndex;
      //itterate through food array to find closest food to player
      for (let i = 0; i < food.length; i++) {
        const distToCurrentFood = sqrt(sq(food[i].x - this.x) + sq(food[i].y - this.y));
        if (distToCurrentFood < closestFoodDist) { //if curretn dist to food is closer than stored dist to closest food..
          closestFood = food[i];
          closestFoodIndex = i;
          closestFoodDist = distToCurrentFood;
        }
      }
      this.eatFood(closestFood, closestFoodIndex); //if overlapping food, eat it (splice it from array)
      let targetX = closestFood.x;
      let targetY = closestFood.y;

      let vectorToTarget = createVector(targetX - this.x, targetY - this.y);
      //make sure as the creature gets closer it doesn't get too slow
      if (vectorToTarget.mag() < 10) {
        vectorToTarget.setMag(10);
      }

      //VectorToTarget - this.velocity (finds differences in two vectors, or vector which takes velocityvector to vecToTarget)
      let desiredChangeInVelocity = p5.Vector.sub(vectorToTarget, this.velocity);

      const distToTarget = vectorToTarget.mag();

      let addToVelocity = desiredChangeInVelocity.mult(weight); //
      if (debugDisplay) {
        stroke(255, 0, 255);
        line(this.x, this.y, this.x + addToVelocity.x, this.y + addToVelocity.y);
      }

      this.velocity.add(addToVelocity);
    }
  }
  eatFood(foodPointer, foodIndex) {
    // if circle collsion true
    const eatSz = this.size / 3;
    if ((foodPointer.x < this.x + eatSz) && (foodPointer.x > this.x - eatSz)) {
      if ((foodPointer.y < this.y + eatSz) && (foodPointer.y > this.y - eatSz)) {
        // fill(0);
        // ellipse(foodPointer.x,foodPointer.y,100);
        // noFill();
        foodPointer.radio.style.display = "none";
        food.splice(foodIndex, 1);
        this.food += 1;
        // fill(255,0,0);
        // ellipse(foodPointer.x,foodPointer.y,foodPointer.size);
        // noFill();
      }
    }

    // splice

  }

  align(weight) { //calc all nearby velocities, add them up, avg them.
    let sumVelocityOfNeighbors = createVector(0, 0);
    let creaturesWithinRadius = 0;
    const radiusThreshold = this.size * 2;
    for (let i = 0; i < creature.length; i++) {
      const distToCreature = createVector(creature[i].x - this.x, creature[i].y - this.y);
      if (distToCreature.mag() < radiusThreshold) { //if within radius, record it, add to summ
        const velocityOfNeighbor = creature[i].velocity;
        creaturesWithinRadius++;
        sumVelocityOfNeighbors.add(velocityOfNeighbor);
      }
    }
    const avgVelocityOfNeighbors = sumVelocityOfNeighbors.div(creaturesWithinRadius);
    let vectorToTarget = avgVelocityOfNeighbors;

    //VectorToTarget - this.velocity (finds differences in two vectors, or vector which takes velocityvector to vecToTarget)
    let desiredChangeInVelocity = p5.Vector.sub(vectorToTarget, this.velocity);

    const distToTarget = vectorToTarget.mag();

    let addToVelocity = desiredChangeInVelocity.mult(weight);
    if (debugDisplay === true) {
      stroke(255, 50, 50, 40);
      noFill();
      ellipse(this.x, this.y, radiusThreshold);
      stroke(255, 50, 50);
      line(this.x, this.y, this.x + addToVelocity.x * 100, this.y + addToVelocity.y * 100);
    }

    this.velocity.add(addToVelocity);
    //away from neighby x/y positions
  }
  seperate(weight) {
    let sumDistToCreatures = createVector(0, 0);
    let creaturesWithinRadius = 0;
    const seperationThreshold = this.size * 2;
    for (let i = 0; i < creature.length; i++) {
      const distToCreature = createVector(this.x - creature[i].x, this.y - creature[i].y);
      if (distToCreature.mag() < seperationThreshold) { //if within radius, record it, add to summ
        creaturesWithinRadius++;
        const magBasedOnDist = map(distToCreature.mag(), 0, seperationThreshold, 250, 0);
        distToCreature.normalize();
        const addToSum = distToCreature.mult(magBasedOnDist);
        sumDistToCreatures.add(distToCreature);
      }
    }
    let avgDistToCreatures = sumDistToCreatures.div(creaturesWithinRadius);
    let vectorToTarget = avgDistToCreatures;

    //VectorToTarget - this.velocity (finds differences in two vectors, or vector which takes velocityvector to vecToTarget)
    let desiredChangeInVelocity = p5.Vector.sub(vectorToTarget, this.velocity);

    const distToTarget = vectorToTarget.mag();

    let addToVelocity = desiredChangeInVelocity.mult(weight);
    if (debugDisplay === true) {
      stroke(0, 0, 255, 40);
      noFill();
      ellipse(this.x, this.y, seperationThreshold);
      stroke(0, 0, 255);
      line(this.x, this.y, this.x + addToVelocity.x, this.y + addToVelocity.y);
    }

    this.velocity.add(addToVelocity);
    //away from neighby x/y positions
  }
  clump(weight) {
    let sumDistToCreatures = createVector(0, 0);
    let creaturesWithinRadius = 0;
    const radiusThreshold = this.size * this.clumpRadius;
    for (let i = 0; i < creature.length; i++) {
      const distToCreature = createVector(creature[i].x - this.x, creature[i].y - this.y);
      if (distToCreature.mag() < radiusThreshold) { //if within radius, record it, add to summ
        creaturesWithinRadius++;
        sumDistToCreatures.add(distToCreature);
      }
    }
    const avgDistToCreatures = sumDistToCreatures.div(creaturesWithinRadius);
    let vectorToTarget = avgDistToCreatures;

    //VectorToTarget - this.velocity (finds differences in two vectors, or vector which takes velocityvector to vecToTarget)
    let desiredChangeInVelocity = p5.Vector.sub(vectorToTarget, this.velocity);

    const distToTarget = vectorToTarget.mag();

    let addToVelocity = desiredChangeInVelocity.mult(weight); //
    if (debugDisplay === true) {
      stroke(0, 255, 255, 40);
      noFill();
      ellipse(this.x, this.y, radiusThreshold);
      stroke(0, 255, 255);
      line(this.x, this.y, this.x + addToVelocity.x, this.y + addToVelocity.y);
    }
    this.velocity.add(addToVelocity);
    //away from neighby x/y positions
  }
  wander(weight) { //use 2d perlin noise to create random point within unit circle
    const noiseIncrement = .002;
    this.wanderXIndex += noiseIncrement;
    this.wanderYIndex += noiseIncrement;
    let xTarget = ((noise(this.wanderXIndex) * 2) - 1) * this.size;
    let yTarget = ((noise(this.wanderYIndex) * 2) - 1) * this.size;
    // ellipse(this.x+xTarget,this.y+yTarget,5);
    let vectorToTarget = createVector(xTarget, yTarget);

    //VectorToTarget - this.velocity (finds differences in two vectors, or vector which takes velocityvector to vecToTarget)
    let desiredChangeInVelocity = p5.Vector.sub(vectorToTarget, this.velocity);

    const distToTarget = vectorToTarget.mag();

    let addToVelocity = desiredChangeInVelocity.mult(weight * .01);

    if (debugDisplay) {
      stroke(0, 0, 255);
      line(this.x, this.y, this.x + addToVelocity.x, this.y + addToVelocity.y);
    }

    this.velocity.add(addToVelocity);
    //away from neighby x/y positions
  }

  addVelocityToPosition() {
    this.velocity.div(this.velocity.mag()/3);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  updateSliders() {
    //add slider index
    this.sliderIndex += this.velocity.mag() / this.size * 3 * this.sliderIndexIncrementConstant;
    this.sliderHorz.value = sin(this.sliderIndex);
    this.sliderVert.value = sin(this.sliderIndex + PI);
    const currentAngle = atan2(this.velocity.y, this.velocity.x);
    let currentDegrees = currentAngle / PI * 180;
    currentDegrees += 90;
    // currentRadians = 0;
    // console.log(currentDegrees);
    // this.transformElement(this.sliderHorz, 0, (this.sliderHeight * 1.5), "px");
    this.sliderHorz.style.transform = "rotate(" + currentDegrees + 270 + "deg)";
    this.sliderVert.style.transform = "rotate(" + currentDegrees + 0 + "deg)"; //right
  }

  updatePositionOfElements() {
    let xOffset = this.size / 1.7;
    let yOffset = this.size / 4;
    this.transformElement(this.div, this.x - this.size / 2, this.y - this.sliderHeight * 2, "px");
  }

  hungerUpdate() {
    this.food -= this.hungerRate;
      if (this.food > 4) { //if food is over threshold, spawn bby with similar attrbutes
        let newCreature = new Creature(this.size,this.nameValueGeneration+1);
        newCreature.x = this.x;
        newCreature.y = this.y;
        newCreature.size = this.size;
        newCreature.seekMouseWeight = this.seekMouseWeight;
        newCreature.clumpWeight = this.clumpWeight + this.clumpMutationRate;
        newCreature.clumpRadius = this.clumpRadius + this.clumpRadiusMutationRate;
        // newCreature.seperateWeight = this.seperateWeight;
        newCreature.wanderWeight = this.wanderWeight + this.wanderMutationRate;
        newCreature.seekFoodWeight = this.seekFoodWeight + this.seekFoodMutationRate;
        newCreature.name.setAttribute("value",this.nameValue+"_"+newCreature.nameValueGeneration);
        creature.push(newCreature);
        this.food = this.food/2;
        //spawn bby with same genes and name
      }
  }
  update() {
    this.hungerUpdate();
    // this.seekMouse(this.seekMouseWeight);
    // this.align(.1);

    this.clump(this.clumpWeight);
    // this.seperate(this.seperateWeight);
    this.wander(this.wanderWeight);
    this.seekFood(this.seekFoodWeight);

    this.addVelocityToPosition();
    this.screenWrap();
    this.updatePositionOfElements();
    this.updateSliders();
    this.debugDisplay();
  }
  debugDisplay() {
    if (debugDisplay === true) {
      text(this.food, this.x,this.y-this.size);
      stroke(0);
      fill(255, 255, 255, 50);
      ellipse(this.x, this.y, this.size);
      stroke(0, 0, 0, 0);
      line(this.x, this.y, this.x + this.velocity.x, this.y + this.velocity.y);
    }
  }

}
