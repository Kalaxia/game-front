import Dictionnary from './core/dictionnary.js';

import Fleet from './model/fleet.js';
import Planet from './model/planet.js';


const planetId = window.getCurrentPlanet();


export const initFleetViewPlanet = ()=>{
	
	Planet.fetch(planetId).then(planet => {
		
		document.querySelector('#fleet-create').innerHTML = Dictionnary.translations.fleet.view.planet.create.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}" class="planet">${planet.name}</a>`);
		
		document.querySelector('#fleet-create').addEventListener("click" , creatFleet)
	});
	
	Fleet.fetch(planetId).then(fleets => {
		
		
		
		document.querySelector('#fleets-list').innerHTML = "";
		
		if (fleets != null && fleets != undefined && fleets != []) {
			
			
			for (var i in fleets){
				var textPosition;
				
				if (fleets[i].location != null && fleets[i].location != undefined && fleets[i].location != {}) {
					var planet = fleets[i].location;
					
					textPosition = Dictionnary.translations.fleet.view.planet.on_planet.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}" class="planet" >${planet.name}</a>`)
					
					
					
					
				}
				else{
					textPosition = Dictionnary.translations.fleet.view.planet.on_journey // TODO implementation 
				}
				
				var id = fleets[i].id;
				document.querySelector('#fleets-list').innerHTML +=
						`<div class=fleet-container> <span class=fleet-id> ${id} </span> <span class=fleet-position> ${textPosition} </span> </div>`
			}
		}
		else{
			/*
			Planet.fetch(planetId).then(planet => {
				var planetText = Dictionnary.translations.fleet.view.planet.no_fleet.replace("%planet%", `^<a href="/views/map/planet.html?id=${planet.id}" class="planet" >${planet.name}</a>`);
				document.querySelector('#fleets-list').innerHTML =  `<span class="noFleet"> ${planetText}</span>`
			});
			*/
			
			var planetText = Dictionnary.translations.fleet.view.planet.no_fleet;
			document.querySelector('#fleets-list').innerHTML =  `<span class="noFleet"> ${planetText}</span>`
			
		}
	});
}

export const initFleetView = ()=>{
	
}

export const creatFleet = ()=>{
	alert("test")
}
