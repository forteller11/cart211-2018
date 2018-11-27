function setup(){
  'use strict';
let newElement = document.createElement("INPUT");
newElement.setAttribute("type", "range");
newElement.textContent = 'ah';
let body = document.getElementById('bod');
body.appendChild(newElement);
console.log(body);
}
