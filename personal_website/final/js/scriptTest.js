function setup(){
  'use strict';
let newElement = document.createElement("INPUT");
newElement.setAttribute("type", "range");
newElement.setAttribute("min", -1 );
newElement.setAttribute("max", 1 );
newElement.textContent = 'ah';
let body = document.getElementById('bod');
body.appendChild(newElement);
console.log(newElement);

newElement.value = 10;
newElement.style.position = "absolute";
newElement.style.top = "20px";
newElement.style.width = "200px";
newElement.style.height = "20px";
newElement.style.transform = "rotate(270deg)";
}
