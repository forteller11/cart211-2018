let creature;
let style = true;
let debugDisplay = false;
'use strict'

function setup() {
  creature = new Creature(100,"final",0,false);


}

function draw() {
creature.update();
}
