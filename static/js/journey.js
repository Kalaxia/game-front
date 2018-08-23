import Dictionnary from './core/dictionnary.js';

import Fleet from './model/fleet.js';
import Planet from './model/planet.js';
import Player from './model/player.js';
import App from './core/app.js';

import { mapScale, minimapScale } from './map.js';

var rangeData;
var currentFleet;
const offsetSizeTraget = -15; // -7 :  (widthExtene - widthIntern)/2 + boder width
export const initJourneyView = (id) => {
	
	Fleet.fetch(id).then( fleet => {
		currentFleet = fleet;
		currentFleet.fetchRange().then( (range) => {
			rangeData = range;
			if (fleet.journey == null || fleet.journey == undefined || fleet.journey.id == null ||  fleet.journey.id == undefined){
				if (fleet.location != null && fleet.location != undefined) {
					document.querySelectorAll(`#map [data-id='${fleet.location.system.id}']`).forEach( node => {
						
						var scale = mapScale;
						node.classList.add("fleet-location");
						node.style.top = parseInt(node.style.top)-2+"px";  //-2 to repos correctly
					    node.style.left = parseInt(node.style.left)-2+"px";
						var systemElementTraget = document.createElement("div");
					    systemElementTraget.classList.add('fleet-location-target');
					    systemElementTraget.style.top = (fleet.location.system.coord_y * scale + offsetSizeTraget) + 'px';
					    systemElementTraget.style.left = (fleet.location.system.coord_x * scale + offsetSizeTraget) + 'px';
						systemElementTraget.innerHTML = `<div class="north"></div> <div class="south"></div> <div class="east"></div> <div class="west"></div>`
						node.parentNode.appendChild(systemElementTraget);
						
						var rangeCircle = document.createElement("div");
						rangeCircle.style.width = range.planet_to_planet*scale+"px"; // I juste choose one
						rangeCircle.style.height = range.planet_to_planet*scale+"px";
						const BORDER_WIDTH = 6;
						rangeCircle.style.top = (fleet.location.system.coord_y * scale - parseInt(rangeCircle.style.height)/2 - BORDER_WIDTH/2) + 'px';
					  	rangeCircle.style.left = (fleet.location.system.coord_x * scale - parseInt(rangeCircle.style.width)/2 - BORDER_WIDTH/2) + 'px';
						rangeCircle.style["border-width"] = BORDER_WIDTH + "px";
						rangeCircle.classList.add('range-circle');
						
						node.parentNode.appendChild(rangeCircle);
					})
				}
				else{
					// TODO
				}
			}
		});
	});
	
	
}
