import Dictionnary from './core/dictionnary.js';

import Fleet from './model/fleet.js';
import Planet from './model/planet.js';
import Player from './model/player.js';

import { getHTMLShipArrayStringFleet, getHTMLShipArrayStringHangar, UniqueModelList } from './ship.js';

/************************/
// Global Variable

const planetId = window.getCurrentPlanet();
var fleetId = window.getCurrentFleet();
var planetIdFleetLocation;
const COLL_SPAN = 2;
var modelListHangar;
var modelListFleet;
const TIMEOUT_INPUT_DURATION = 1000;

/************************/
// utils

const refreshFleetId = () => {
	fleetId = window.getCurrentFleet();
}

/************************/
// get HTML data

const getHTMLFleetArrayData = (fleets,isPlanetView = true) => {
	/*
	 * return a string in HTML format displaying information about the Array
	 * isPlanetView is a boolean which is true when requesting string to display view for a planet and false when requesting view for all fleets or for single fleet
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

export const getHTMLFleetData = (fleet,isPlanetView = true) => {
	/*
	 * return a string in HTML format displaying information about the fleet
	 * isPlanetView is a boolean which is true when requesting string to display view for a planet and false when requesting view for all fleets or for single fleet
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
		// TODO when journey in implemented chnage the texte to show #comeback
		if (isPlanetView) {
			textPosition = Dictionnary.translations.fleet.view.planet.on_journey;
		}
		else{
			textPosition = Dictionnary.translations.fleet.view.all.on_journey;
		}
	}
	
	var id = fleet.id;
	return `<tr class="fleet-container tr-link" onclick="location.href='/views/fleet/fleet.html?id=${id}'"> <th class="fleet-id"> ${id} </th> <th class="fleet-position"> ${textPosition} </th> </tr>`;
	
};


/************************/
// View

const refreshFleetViewPlanet = () => {
	/*
	 * Fetch the fleet and update the html
	 */
	
	Fleet.fetchPlanetFleets(planetId).then(fleets => {
		
		document.querySelector('#fleet-table').innerHTML = getHTMLFleetArrayData(fleets,true); // we reset the list 
		
	});
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



export const initBaseForFleet = () => Planet.fetch(planetId).then(planet => {
    
	Player.fetchCurrentPlayer().then(player => {
	    var profileLink = document.createElement('a');
	    profileLink.href = '/views/profile';
	    profileLink.innerText = player.pseudo;
	    document.querySelector("#player-data h3").appendChild(profileLink);
		document.querySelector('#logout').addEventListener('click', () => {
			Player.logout();
		});
	});
	
    document.querySelector('#planet-data > header > h1').innerHTML = Dictionnary.translations.planet.fleet.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}">${planet.name}</a>`);
});

export const initFleetViewSingle = () => {
	/*
	 * initialise the view for one fleet
	 */
	
	refreshFleetId();
	
	var id = fleetId;
	
	Fleet.fetch(id).then( fleet => {
		document.querySelector('#fleet-table').innerHTML = getHTMLFleetArrayData([fleet],false);
		
		planetIdFleetLocation = fleet.location.id; // in fact we set the planetId to the fleet location
		if (planetIdFleetLocation != null && planetIdFleetLocation != undefined){
			Planet.fetch(planetIdFleetLocation).then(planet => { 
				
				document.querySelector('#fleet-view > section > h3').innerHTML = Dictionnary.translations.fleet.view.single.title.replace("%fleet%", `<span class="fleet-id"> ${id} </span>`);
				
				refreshShipsView(planetIdFleetLocation);
			});
		}
		else{
			//TODO show for journey
		}
	});
	
};

const refreshShipsView = (hangarId) => {
	/*
	 * refresh the two tables the ships for the single fleet view with the possibility of transfering ships
	 */
	

	/*return new Promise ((resolve, reject) => {
	let promiseResolved = false;
	let rejectTiemout = setTimeout(reject, 2000);*/
	
	var promiseArray = [];
	
	promiseArray[0] = Planet.fetchShips(hangarId).then( ships => {
		document.querySelector('#ships-hangar > .ships-list > div.ships-table').innerHTML= getHTMLShipArrayStringHangar(ships); //< make the table for ships in hangar
		
		
		var flexRows = document.querySelectorAll('#ships-hangar > .ships-list > div.ships-table > div.flex-row:not(:first-child)'); //< querry each row exept header
		document.querySelector('#ships-hangar > .ships-list > div.ships-table > div.flex-row:first-child').innerHTML += `<div class="model-transfer"> ${Dictionnary.translations.fleet.view.single.transfer} </div>` //< in the header add a new collum
		
		// modelListHangar is a global variable in order ro dimishi the number of fetch
		modelListHangar = new UniqueModelList(ships); //< see in Ships.js, this is a tool
		
		
		flexRows.forEach((node) => {
			
			/* In eah row exept the header we add a new collum for the transfer
			 * which has a soan ( as a button) and in number inputé.
			 * I store the model id in the atribute "model-id-data"
			 */
			var modelIdData =  node.querySelector('.model-number').getAttribute("model-id-data");
			node.innerHTML += `<div class="model-transfer"> <input type="number"><span class ="transfer-ship" model-id-data="${modelIdData}"> ${Dictionnary.translations.fleet.view.single.transfer} </span> </div>
			</div>` ;
			
			
			node.querySelector('span.transfer-ship').onclick = (event) => {transferShipsToFleetButtonClick(event)};
			node.querySelector('input').value = 1;
			node.querySelector('input').oninput = (event) => {inputEventManagerHangar(event)};
			
		});
		
		/*if ( promiseResolved ){
			clearTimeout(rejectTiemout);
			resolve;
		}
		else{
			promiseResolved = true;
		}*/
		
	});
	
	
	promiseArray[1] = Fleet.fetchShips(fleetId).then( ships => {
		document.querySelector('#ships-fleet > .ships-list > div.ships-table').innerHTML= getHTMLShipArrayStringHangar(ships);
		
		
		var flexRows = document.querySelectorAll('#ships-fleet > .ships-list > div.ships-table > div.flex-row:not(:first-child)');
		document.querySelector('#ships-fleet > .ships-list > div.ships-table > div.flex-row:first-child').innerHTML += `<div class="model-transfer"> ${Dictionnary.translations.fleet.view.single.transfer} </div>`;
		
		modelListFleet = new UniqueModelList(ships);
		
		flexRows.forEach((node) => {
			
			var modelIdData =  node.querySelector('.model-number').getAttribute("model-id-data");
			node.innerHTML += `<div class="model-transfer"> <input type="number"><span class ="transfer-ship" model-id-data="${modelIdData}"> ${Dictionnary.translations.fleet.view.single.transfer} </span> </div>
			</div>`;
			
			node.querySelector('span.transfer-ship').onclick = (event) => {transferShipsToHangarButtonClick(event)};
			node.querySelector('input').value = 1;
			node.querySelector('input').oninput = (event) => {inputEventManagerFleet(event)};
		});
		
		/*if ( promiseResolved ){
			clearTimeout(rejectTiemout);
			resolve;
		}
		else{
			promiseResolved = true;
		}*/
	});
		
		
		
	/*});*/
	
	return promiseArray;
};

const refreshShipsViewWithInputBoxNumbers = () => {
	/*
	 * Restet the view and keep the input number os the ships
	 */
	var nodesFleet = document.querySelectorAll('#ships-fleet > .ships-list > div.ships-table > div.flex-row:not(:first-child)');
	var modelIdArrayFleet = [];
	var inputArrayFleet = [];
	var modelIdArrayHangar = [];
	var inputArrayHangar = [];
	
	nodesFleet.forEach((node) => { // we search and store the inputs value for the fleet ships
		var modelIdData = parseInt(node.querySelector('.model-number').getAttribute("model-id-data"));
		modelIdArrayFleet.push(modelIdData);
		inputArrayFleet.push(parseInt(node.querySelector('input').value));
	});
	
	var nodesHangar = document.querySelectorAll('#ships-hangar > .ships-list > div.ships-table > div.flex-row:not(:first-child)');
	
	nodesHangar.forEach((node) => { // we search and store the inputs value for the hangar ships
		var modelIdData =  parseInt(node.querySelector('.model-number').getAttribute("model-id-data"));
		modelIdArrayHangar.push(modelIdData);
		inputArrayHangar.push(parseInt(node.querySelector('input').value));
	});
	
	var promiseArray = refreshShipsView(planetIdFleetLocation)
	
	promiseArray[0].then(() => {
		document.querySelectorAll('#ships-hangar > .ships-list > div.ships-table > div.flex-row:not(:first-child)').forEach( (node) => {
			var modelIdData =  parseInt(node.querySelector('.model-number').getAttribute("model-id-data"));
			for (let i in modelIdArrayHangar){
				if (modelIdData == modelIdArrayHangar[i]) {
					node.querySelector('input').value = inputArrayHangar[i];
					break;
				}
			}
		});
	});
	
	promiseArray[1].then(() => {
		document.querySelectorAll('#ships-fleet > .ships-list > div.ships-table > div.flex-row:not(:first-child)').forEach( (node) => {
			var modelIdData =  parseInt(node.querySelector('.model-number').getAttribute("model-id-data"));
			for (let i in modelIdArrayFleet){
				if (modelIdData == modelIdArrayFleet[i]) {
					node.querySelector('input').value = inputArrayFleet[i];
					break;
				}
			}
		});
	});
	
};

/**************************************/
// Events 

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

export const transferShipsToFleetButtonClick = (event) => {
	/*
	 * function called when the span to transfer ships to fleet is pushed ( so the button in the HANGAR)
	 */
	
	
	var node = event.currentTarget;
	var number = parseInt(node.parentNode.querySelector(`input`).value)
	
	
	
	if ( isNaN(number) || number <= 0) {
		transferShipsErrorShow(node ,Dictionnary.translations.fleet.view.single.error.need_positive_number);
		throw "I need a positive number of ships to transfer";
	}
	
	var modelId = parseInt(node.getAttribute("model-id-data"));
	
	
	if (isNaN(modelId)){
		transferShipsErrorShow(node ,Dictionnary.translations.fleet.view.single.error.model_id_NaN);
		throw "modelId must be an integer";
	}
	
	var ships =modelListHangar.getShipsIdFromModelId(modelId);
	
	if (ships.length == 0){
		transferShipsErrorShow(node ,Dictionnary.translations.fleet.view.single.error.no_ships_with_model);
		throw "You have no ships with this id";
	}
	if (ships.length < number){
		transferShipsErrorShow(node ,Dictionnary.translations.fleet.view.single.error.not_enough_ship);
		throw "Not enought ships to transfer";
	}
	
	refreshFleetId();
	
	var shipsIdToTransfer = ships.splice(0,number); // take only the number ships in shipsIdToTransfer
	Fleet.transferShipsToFleet(shipsIdToTransfer,fleetId).then( () => {
		refreshShipsViewWithInputBoxNumbers(); //< robuste way to refresh view but require two fetch
	});
	
};

export const transferShipsToHangarButtonClick = (event) => {
	/*
	 * function called when the span to transfer ships to hangar is pushed ( so the button in the FLEET)
	 */
	var node = event.currentTarget;
	var number = parseInt(node.parentNode.querySelector(`input`).value);
	
	if ( isNaN(number) || number <= 0) {
		transferShipsErrorShow(node ,Dictionnary.translations.fleet.view.single.error.need_positive_number);
		throw "I need a positive number of ships to transfer";
	}
	
	var modelId = parseInt(node.getAttribute("model-id-data"));
	
	if (isNaN(modelId)){
		transferShipsErrorShow(node ,Dictionnary.translations.fleet.view.single.error.model_id_NaN);
		throw "modelId must be an integer";
	}
	var ships =modelListFleet.getShipsIdFromModelId(modelId);
	
	if (ships.length == 0){
		transferShipsErrorShow(node ,Dictionnary.translations.fleet.view.single.error.no_ships_with_model);
		throw "You have no ships with this id";
	}
	if (ships.length < number){
		transferShipsErrorShow(node ,Dictionnary.translations.fleet.view.single.error.not_enough_ship);
		throw "Not enought ships to transfer";
	}
	
	var shipsIdToTransfer = ships.splice(0,number); // take only the number ships in shipsIdToTransfer
	Fleet.transferShipsToHangar(shipsIdToTransfer).then( () => {
		refreshShipsViewWithInputBoxNumbers(); //< robuste way to refresh view but require two fetch
	});
	
};

const transferShipsErrorShow = (node, errorMessage) => {
	var parent = node.parentNode;
	
	var errorsSpan = parent.querySelector('span.error-transfer')
	if (errorsSpan == null) {
		let span = document.createElement("span")
		span.innerHTML = "<br>" + errorMessage;
		span.classList.add("error-transfer");
		parent.appendChild(span);
	}
	else{
		errorsSpan.innerHTML = "<br>"+errorMessage;
	}
};

export const inputEventManagerFleet = (event) => {
	/*
	 * When the input is updated a timeout is set if there is a new modification the timeout is reset
	 * the function in the timeout check that the input is correct and is not 
	 * smaller that 1 or greater that the the total number of ships
	 *
	 * I have always hated input with range that correct immeditely the input. 
	 * By instant you have 300 ships and the input si set to 100 and you want to transfer 150 ships.
	 * What I sometimes do is that I write 1|00 -> 15|00 -> 15|0 but at the second step it directly set me to 300 ships
	 * 
	 */
	
	var node = event.currentTarget;
	var timeoutId = parseInt(node.getAttribute("timeout-id"));
	if (timeoutId != undefined && timeoutId != null && ! isNaN(timeoutId)) {
		clearTimeout(timeoutId);
	}
	node.setAttribute("timeout-id", setTimeout(inputCheckValueFleet, TIMEOUT_INPUT_DURATION,node));
};

export const inputEventManagerHangar = (event) => {
	/*
	 * When the input is updated a timeout is set if there is a new modification the timeout is reset
	 * the function in the timeout check that the input is correct and is not 
	 * smaller that 1 or greater that the the total number of ships
	 *
	 * I have always hated input with range that correct immeditely the input. 
	 * By instant you have 300 ships and the input si set to 100 and you want to transfer 150 ships.
	 * What I sometimes do is that I write 1|00 -> 15|00 -> 15|0 but at the second step it directly set me to 300 ships
	 * 
	 */
	var node = event.currentTarget
	var timeoutId = parseInt(node.getAttribute("timeout-id"));
	if (timeoutId != undefined && timeoutId != null && ! isNaN(timeoutId)) {
		clearTimeout(timeoutId)
	}
	node.setAttribute("timeout-id", setTimeout(inputCheckValueHangar, TIMEOUT_INPUT_DURATION,node));
};


export const inputCheckValueFleet = (node) => {
	/*
	 * Check that the input has correct value (not NaN, > 0 and <= total ammount of ships)
	 */
	var number = parseInt(node.value);
	if ( isNaN(number) ) {
		node.value = 1;
	}
	else{
		var modelId = parseInt(node.parentNode.querySelector('span.transfer-ship').getAttribute("model-id-data"));
		var maxNumber = modelListFleet.getNumberFromModelId(modelId);
		node.value = Math.max(Math.min(number,maxNumber),1); 
	}
};

export const inputCheckValueHangar = (node) => {
	/*
	 * Check that the input has correct value (not NaN, > 0 and <= total ammount of ships)
	 */
	var number = parseInt(node.value);
	if ( isNaN(number) ) {
		node.value = 1;
	}
	else{
		var modelId = parseInt(node.parentNode.querySelector('span.transfer-ship').getAttribute("model-id-data"));
		var maxNumber = modelListHangar.getNumberFromModelId(modelId);
		node.value = Math.max(Math.min(number,maxNumber),1); 
	}
};
