import Dictionnary from './core/dictionnary.js';

import Fleet from './model/fleet.js';
import Planet from './model/planet.js';


const planetId = window.getCurrentPlanet();

const refreshFleetViewPlanet = () => {
	/*
	 * Fetch the fleet and update the html
	 *
	 *
	 */
	Fleet.fetchPlanetFleets(planetId).then(fleets => {
		
		document.querySelector('#fleets-list').innerHTML = getHTMLFleetArrayData(fleets); // we reset the list 
		
		
		
	});
};

const getHTMLFleetArrayData = (fleets) => {
	/*
	 * return a string in HTML format displaying information about the Array
	 * 
	 */
	
	var stringHTMLToReturn="";
	
	if (fleets == null || fleets == undefined || fleets == []) {
		
		stringHTMLToReturn =  `<span class="noFleet"> ${Dictionnary.translations.fleet.view.planet.no_fleet}</span>`;
		
		return stringHTMLToReturn;
	}
	//Else
	
	for (var i in fleets){
		stringHTMLToReturn += getHTMLFleetData(fleets[i]);
	}
	
	return stringHTMLToReturn;
	
};

const getHTMLFleetData = (fleet) => {
	/*
	 * return a string in HTML format displaying information about the fleet
	 * 
	 */
	
	if (fleet == null || fleet == undefined || fleet == {}) {
		return `<span class="noFleet"> ${Dictionnary.translations.fleet.view.planet.error_showing_fleet}</span>`;
		
	}
	//Else
	
	var textPosition; 
	
	if (fleet.location != null && fleet.location != undefined && fleet.location != {}) {
		var planet = fleet.location;
		textPosition = Dictionnary.translations.fleet.view.planet.on_planet.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}" class="planet" >${planet.name}</a>`);					
	}
	else{
		// if the fleet is not link to a planet that means that it is on a journey
		// this is unimplemented yet.
		//TODO when journey in implemented chnage the texte to show
		textPosition = Dictionnary.translations.fleet.view.planet.on_journey; 
	}
	
	var id = fleet.id;
	
	return `<div class=fleet-container> <span class=fleet-id> ${id} </span> <span class=fleet-position> ${textPosition} </span> </div>`;
	
};

export const initFleetViewPlanet = () => {
	/*
	 * initialise the view for the fleets on a planet
	 */
	
	Planet.fetch(planetId).then(planet => {
		
		document.querySelector('#fleet-create').innerHTML = Dictionnary.translations.fleet.view.planet.create.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}" class="planet">${planet.name}</a>`);
		document.querySelector('#fleet-create').addEventListener("click" , creatFleet);
		//< stricly it does not have to be in the promise then
		//< but I don't want the event to be active before the texte initialise
		
	});
	
	refreshFleetViewPlanet();
};

export const initFleetView = () => {
	/*
	 * initialise the view for all the fleets
	 */
};

export const creatFleet = () => {
	/*
	 * create a new fleet on the selected base
	 */
	
	Fleet.createNewFleet(planetId).then(fleet => {
		
		
		
		document.querySelector('#fleets-list').innerHTML += getHTMLFleetData(fleet);
		//< add tge new fleet to the list
		
		//refreshFleetViewPlanet(); //< after the creation of the fleet wi refresh the view
		
	});
	
	
};
