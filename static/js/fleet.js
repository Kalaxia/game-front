import Dictionnary from './core/dictionnary.js';

import Fleet from './model/fleet.js';
import Planet from './model/planet.js';


const planetId = window.getCurrentPlanet();
const COLL_SPAN = 2;

const refreshFleetViewPlanet = () => {
	/*
	 * Fetch the fleet and update the html
	 */
	
	Fleet.fetchPlanetFleets(planetId).then(fleets => {
		
		document.querySelector('#fleet-table').innerHTML = getHTMLFleetArrayData(fleets,true); // we reset the list 
		
	});
};

const getHTMLFleetArrayData = (fleets,isPlanetView = true) => {
	/*
	 * return a string in HTML format displaying information about the Array
	 * isPlanetView is a boolean which is true when requesting string to display view for a planet and false when reauesting view for all fleets
	 */
	
	var stringHTMLToReturn=`<tr class="header-table"><th class = "fleet-id"> ${Dictionnary.translations.fleet.view.header_id} </th> <th class = "fleet-position"> ${Dictionnary.translations.fleet.view.header_location} </th> </tr>`;
	
	if (fleets == null || fleets == undefined || fleets.length == 0) {
		
		if (isPlanetView) {
			stringHTMLToReturn +=  `<tr><th class="no-fleet-planet" colspan=${COLL_SPAN}> ${Dictionnary.translations.fleet.view.planet.no_fleet}</th></tr>`;
		}
		else{
			stringHTMLToReturn +=  `<tr><th class="no-fleet-all" colspan=${COLL_SPAN}> ${Dictionnary.translations.fleet.view.all.no_fleet}</th></tr>`;
		}
		
		return stringHTMLToReturn;
	}
	//Else
	
	for (var i in fleets){
		stringHTMLToReturn += getHTMLFleetData(fleets[i],isPlanetView);
	}
	
	return stringHTMLToReturn;
	
};

const getHTMLFleetData = (fleet,isPlanetView = true) => {
	/*
	 * return a string in HTML format displaying information about the fleet
	 * isPlanetView is a boolean which is true when requesting string to display view for a planet and false when reauesting view for all fleets
	 */
	
	if (fleet == null || fleet == undefined) {
		
		if (isPlanetView) {
			return `<tr><th class="error-fleet-planet" colspan=${COLL_SPAN}>${Dictionnary.translations.fleet.view.planet.error_showing_fleet}</th></tr>`;
		}
		else{
			return `<tr><th class="error-fleet-all" colspan=${COLL_SPAN}>${Dictionnary.translations.fleet.view.all.error_showing_fleet}</th></tr>`;
		}
		
	}
	//Else
	
	var textPosition; 
	
	if (fleet.location != null && fleet.location != undefined ) {
		
		var planet = fleet.location;
		
		if (isPlanetView) {
			textPosition = Dictionnary.translations.fleet.view.planet.on_planet.replace("%planet%", `${planet.name}`);
		}
		else{
			textPosition = Dictionnary.translations.fleet.view.all.on_planet.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}" class="planet" >${planet.name}</a>`);
		}
		
	}
	else{
		// if the fleet is not link to a planet that means that it is on a journey
		// this is unimplemented yet.
		//TODO when journey in implemented chnage the texte to show
		if (isPlanetView) {
			textPosition = Dictionnary.translations.fleet.view.planet.on_journey;
		}
		else{
			textPosition = Dictionnary.translations.all.view.planet.on_journey;
		}
	}
	
	var id = fleet.id;
	return `<tr class="fleet-container"> <th class="fleet-id"> ${id} </th> <th class="fleet-position"> ${textPosition} </th> </tr>`;
	
};

export const initFleetViewPlanet = () => {
	/*
	 * initialise the view for the fleets on a planet
	 */
	
	Planet.fetch(planetId).then(planet => {
		// initialze the "create fleet" button
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
	
	Fleet.fetchPlayerFleets().then(fleets => {
		
		document.querySelector('#fleet-table').innerHTML = getHTMLFleetArrayData(fleets,false); // we reset the list 
		
	});
	
};

export const creatFleet = () => {
	/*
	 * create a new fleet on the selected base
	 */
	
	Fleet.createNewFleet(planetId).then(fleet => {
		
		//document.querySelector('#fleets-list').innerHTML += getHTMLFleetData(fleet,true);
		//< add tge new fleet to the list
		
		refreshFleetViewPlanet(); //< after the creation of the fleet wi refresh the view
		//< this is more robuste bu require more request
	});
	
	
};
