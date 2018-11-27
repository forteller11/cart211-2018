function setup(){
  'use strict';
let newElement = document.createElement("INPUT");
newElement.setAttribute("type", "range");
newElement.setAttribute("orient", "vertical" );
newElement.textContent = 'ah';
let body = document.getElementById('bod');
body.appendChild(newElement);
console.log(newElement);


newElement.style.position = "absolute";
newElement.style.top = "20px";
newElement.style.width = "200px";
newElement.style.height = "20px";
newElement.style.transform = "rotate(270deg)";
}
