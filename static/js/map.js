import Api from './core/api.js';
import Map from './model/map.js';
import Player from './model/player.js';
import App from '/static/js/core/app.js';
import { initJourneyView, initJourneyViewForPlaner, systemCurrentMenuAdd } from '/static/js/journey.js';

var isPlaner = false; // set if we see the planer
export var mapSize;

export const initMap = () => {
    isPlaner = false;
    initBaseMap();

    Map.fetch().then(map => {
        mapSize = map.size;
        initMapElement(map);
    });
};

export const initMapForJourneyPlaner = () => {
    isPlaner = true;
    initBaseMap();

    Map.fetch().then(map => {
        mapSize = map.size;
        initMapElement(map);
        var fleetId = window.getCurrentFleet();

        if (fleetId != null && fleetId != undefined) {
            initJourneyViewForPlaner(fleetId);
        }
    });

};

const initBaseMap = () => {
    document.onmousedown = startMapMove;
    document.onmouseup = stopMapMove;
    document.onwheel = zoomMap;
    document.oncontextmenu = (event) => {event.preventDefault();}; // no default contextmenu
};

const initMapElement = (map) => {
    for (const system of map.systems) {
        displaySystem(system);
        displayMinimapSystem(system);
    }
};

export const mapScale = 50.0;
export const minimapScale = 2.0;

const displaySystem = system => {
    const map = document.querySelector("#map");
    const systemElement = document.createElement("img");
    systemElement.classList.add('system');
    systemElement.style.top = system.coord_y * mapScale - 10 + 'px'; //-10 to set in the middle ( width 20 px)
    systemElement.style.left = system.coord_x * mapScale - 10 + 'px';
    systemElement.setAttribute('data-id', system.id);
    if (isPlaner) {
        systemElement.addEventListener('contextmenu', systemCurrentMenuAdd); //contextmenu
    } else{
        systemElement.addEventListener('dblclick', redirectToSystem);
    }

    map.appendChild(systemElement);
};

const displayMinimapSystem = system => {
    const minimap = document.querySelector("#minimap");
    const systemElement = document.createElement("div");
    systemElement.classList.add('system');
    systemElement.style.top = system.coord_y * minimapScale - 10 + 'px'; //-10 to set in the middle ( width 20 px)
    systemElement.style.left = system.coord_x * minimapScale - 10 + 'px';
    minimap.appendChild(systemElement);
};

let drag = false;
let offsetX = null;
let offsetY = null;
let coordX = null;
let coordY = null;

const startMapMove = e => {

    if (e.button == 0) { // only left click
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
    }
};

const moveMap = e => {
   if (!drag) {
     return;
   }
   if (!e) {
     e = window.event;
   }
   var map = document.querySelector("#map");

   map.style.left = coordX + (e.clientX - offsetX) + 'px';
   map.style.top = coordY + (e.clientY - offsetY) + 'px';
   return false;
};

 const stopMapMove = () => {
     drag = false;
 };

const redirectToSystem = event => {
    window.location = `/views/map/system.html?id=${event.currentTarget.getAttribute('data-id')}`;
};

const zoomMap = (event) =>{
    var y = event.deltaY; // The amount we scrolled
    const map = document.querySelector("#map");
    //TODO

};
