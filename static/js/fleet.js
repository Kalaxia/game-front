import Dictionnary from './core/dictionnary.js';

import Fleet from './model/fleet.js';
import Planet from './model/planet.js';
import App from './core/app.js';


const COLL_SPAN = 2;

const refreshFleetViewPlanet = () => Fleet.fetchPlanetFleets(App.getCurrentPlanet().id).then(fleets => {
	document.querySelector('#fleet-table').innerHTML = getHTMLFleetArrayData(fleets,true); // we reset the list
});

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

		const planet = fleet.location;

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
	const planet = App.getCurrentPlanet();
	document.querySelector('#fleet-create').innerHTML = Dictionnary.translations.fleet.view.planet.create.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}" class="planet">${planet.name}</a>`);
	refreshFleetViewPlanet();
};

export const initFleetView = () => Fleet.fetchPlayerFleets().then(fleets => {
	document.querySelector('#fleet-table').innerHTML = getHTMLFleetArrayData(fleets,false); // we reset the list
});

export const createFleet = () => Fleet.createNewFleet(App.getCurrentPlanet().id).then(fleet => {
	refreshFleetViewPlanet();
});

export const initBaseForFleet = () => Planet.fetch(App.getCurrentPlanet().id).then(planet => {
    document.querySelector('#planet-data > header > h1').innerHTML = Dictionnary.translations.planet.fleet.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}">${planet.name}</a>`);
});
