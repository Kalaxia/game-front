import Api from './core/api.js';
import Map from './model/map.js';
import Player from './model/player.js';

const mapScale = 50;
const minimapScale = 2;

Map.fetch().then(map => {
    const mapElement = document.querySelector("#map");
    const minimap = document.querySelector("#minimap");
    for (const system of map.systems) {
        displaySystem(mapElement, system, mapScale);
        displaySystem(minimap, system, minimapScale);
    }
});

const displaySystem = (map, system, scale) => {
    const systemElement = document.createElement("div");
    systemElement.classList.add('system');
    systemElement.style.top = system.coord_y * scale + 'px';
    systemElement.style.left = system.coord_x * scale + 'px';
    systemElement.setAttribute('data-id', system.id);
    systemElement.addEventListener('dblclick', redirectToSystem);
    map.appendChild(systemElement);
}

let drag = false;
let offsetX = null;
let offsetY = null;
let coordX = null;
let coordY = null;

const startMapMove = e => {
    const map = document.querySelector("#map");
    // calculate event X, Y coordinates
    offsetX = e.clientX;
    offsetY = e.clientY;

    // assign default values for top and left properties
    if (!map.style.left) {
        map.style.left = '20px';
    }
    if (!map.style.top) {
        map.style.top = '20px';
    }

    // calculate integer values for top and left
    // properties
    coordX = parseInt(map.style.left);
    coordY = parseInt(map.style.top);
    drag = true;
    // move div element
    document.onmousemove = moveMap;
};

const moveMap = e => {
   if (!drag) {
     return;
   }
   if (!e) {
     var e = window.event;
   }
   var map = document.querySelector("#map");
   // move div element
   map.style.left = coordX + e.clientX - offsetX + 'px';
   map.style.top = coordY + e.clientY - offsetY + 'px';
   return false;
 }

 const stopMapMove = () => {
     drag = false;
 }

 const redirectToSystem = event => {
   window.location = `/views/map/system.html?id=${event.currentTarget.getAttribute('data-id')}`;
 }

 window.onload = () => {
     document.onmousedown = startMapMove;
     document.onmouseup = stopMapMove;
 }
