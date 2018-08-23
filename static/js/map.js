import Api from './core/api.js';
import Map from './model/map.js';
import Player from './model/player.js';
import App from '/static/js/core/app.js';
import { initJourneyView } from '/static/js/journey.js';

export const initMap = () => {
    Player.fetchCurrentPlayer().then(player => {
        var profileLink = document.createElement('a');
        profileLink.href = '/views/profile';
        profileLink.innerText = player.pseudo;
        document.querySelector("#player-data h3").appendChild(profileLink);
    });
    
    Map.fetch().then(map => {
        const mapElement = document.querySelector("#map");
        const minimap = document.querySelector("#minimap");
        for (const system of map.systems) {
            displaySystem(mapElement, system, mapScale);
            displaySystem(minimap, system, minimapScale);
        }
        
        var fleetId = window.getCurrentFleet();
        
        if (fleetId != null && fleetId != undefined) {
            initJourneyView(fleetId);
        }
    });
    
    document.onmousedown = startMapMove;
    document.onmouseup = stopMapMove;
    document.onwheel = zoomMap;
};

export const mapScale = 50.0;
export const minimapScale = 2.0;

const ZOOM_SCALE = 1.0/1000.0;




const displaySystem = (map, system, scale) => {
    const systemElement = document.createElement("div");
    systemElement.classList.add('system');
    systemElement.style.top = system.coord_y * scale - 10 + 'px'; //-10 to set in the middle ( width 20 px)
    systemElement.style.left = system.coord_x * scale - 10 + 'px';
    systemElement.setAttribute('data-id', system.id);
    systemElement.addEventListener('dblclick', redirectToSystem);
    map.appendChild(systemElement);
}

let drag = false;
let offsetX = null;
let offsetY = null;
let coordX = null;
let coordY = null;

export let scaleLevel=1;

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
   /*var zoomLevel;
   if (map.style.zoom == "") {
       zoomLevel = 1;
   }
   else{
       zoomLevel = parseFloat(map.style.zoom);
   }*/
   // move div element
   map.style.left = coordX + (e.clientX - offsetX) + 'px';
   map.style.top = coordY + (e.clientY - offsetY) + 'px';
   return false;
 }

 const stopMapMove = () => {
     drag = false;
 }

 const redirectToSystem = event => {
   window.location = `/views/map/system.html?id=${event.currentTarget.getAttribute('data-id')}`;
 }

const zoomMap = (event) =>{
    var y = event.deltaY; // The amount we scrolled
    const map = document.querySelector("#map");
    /*var zoomLevel;
    if (map.style.scale == "") {
        zoomLevel = 1;
    }
    else{
        zoomLevel = parseFloat(map.style.scale);
    }*/
    
    
    //map.transform.scale = Math.max(0.1, zoomLevel - y *ZOOM_SCALE);
    scaleLevel = Math.max(0.1,scaleLevel - y *ZOOM_SCALE)
    map.style["transform-origin"] = `center`
    map.style.transform = `scale(${scaleLevel})`
    
    // TODO zoom center on cursor
    
    /*map.style.left = parseInt(map.style.left) + event.clientX * y * ZOOM_SCALE+ 'px';
    map.style.top = parseInt(map.style.top) + event.clientY * y * ZOOM_SCALE + 'px';*/
    
}
