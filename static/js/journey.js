import Dictionnary from './core/dictionnary.js';

import Fleet from './model/fleet.js';
import Planet from './model/planet.js';
import Player from './model/player.js';
import App from './core/app.js';

import { mapScale, minimapScale } from './map.js';

var currentFleet;

export const initJourneyView = (id) => {
	
	Fleet.fetch(id).then( fleet => {
		currentFleet = fleet;
		
		if (fleet.journey == null ||  fleet.journey == undefined){
			if (fleet.location != null && fleet.location != undefined) {
				document.querySelectorAll(`[data-id={fleet.location.system.id}]`).forEach( node => {
					node.classList.add("fleet-location");
					const systemElementTraget = document.createElement("div");
				    systemElementTraget.classList.add('fleet-location-target');
				    systemElementTraget.style.top = fleet.location.system.coord_y * scale + 'px';
				    systemElementTraget.style.left = fleet.location.system.coord_x * scale + 'px';
					systemElementTraget.innerHTML = `<div class="north"></div> <div class="south"></div> <div class="east"></div> <div class="west"></div>`
					node.parentNode.appendChild(systemElementTraget);
				})
			}
			else{
				
			}
		}
		
	});
	
	
}
