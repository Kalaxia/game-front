import Dictionnary from './core/dictionnary.js';

import Fleet from './model/fleet.js';
import Planet from './model/planet.js';
import Player from './model/player.js';
import System from './model/system.js';
import App from './core/app.js';

import { mapScale, minimapScale } from './map.js';

var rangeData;
var currentFleet;
var isPlaner = false; // set if we see the planer
const OFFSET_SIZE_TARGET = -15; // -7 :  (widthExtene - widthIntern)/2 + boder width

export const initJourneyView = (id) => {
	Fleet.fetch(id).then( (fleet) => {
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
					    systemElementTraget.style.top = (fleet.location.system.coord_y * scale + OFFSET_SIZE_TARGET) + 'px';
					    systemElementTraget.style.left = (fleet.location.system.coord_x * scale + OFFSET_SIZE_TARGET) + 'px';
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
				// Initalise click event Listener
				if (isPlaner) {
					var body = document.querySelector('body');
					body.addEventListener('contextmenu',addPointMap); // contextmenu
				}
			}
		});
	});
};

export const initJourneyViewForPlaner = (id) => {
	isPlaner = true;
	initJourneyView(id);
	
};

function getPosClickOnMap (eventX, eventY, mapNode) {
	var xPosMap; 
	var yPosMap; 
	if (mapNode.style.left == ""){
		xPosMap = 20; // default value
	}
	else{
		xPosMap = parseInt(mapNode.style.left);
	}
	
	if (mapNode.style.top == ""){
		yPosMap = 20; // default value
	}
	else{
		yPosMap = parseInt(mapNode.style.top);
	}
	
	var xCoord = (-xPosMap + eventX);
	var yCoord = (-yPosMap + eventY);
	
	return [xCoord,yCoord];
};

export const addPointMap = (event) => {
	// TODO do not forget to implement zoom when done
	
	
	var body = document.querySelector('body');
	if(event.target === body) { // I determine if a other thing has been clicked
		// enter only if nothing but the body is clicked
		// overlapping commponent will each trigger
		
		closeMenu();
		var map = document.querySelector("#map");
		
		var pos = getPosClickOnMap(event.clientX,event.clientY,map);
		
		console.log(`you clicked on position (${pos[0]/mapScale}, ${pos[1]/mapScale})`);
	}
	else{
		//console.log(`you clicked on something else`);
	}
	
	if (event.type == "contextmenu"){
		event.preventDefault(); // DO not show contexte menue
	}
};

export const systemCurrentMenuAdd = (event) => {
    const timeClosedMenu = new Date(); // now
	var delayWanted;
	if (document.querySelector('.openMenu') == undefined){ // if there is no "openMenu"
		delayWanted = 0;
	}
	else {
		delayWanted = 400;
	}
	closeMenu();
	var systemId = event.currentTarget.getAttribute('data-id');
	var divSystem = event.currentTarget; // I need to save it because after the ftech currentTarget will be modified as is it a pointer.
	var menu = document.querySelector("#map > .contextMenuMapWarper > .contextMenuMap");
	
	console.log(`you clicked on system ${systemId}`);
	
	
    System.fetch(systemId).then( (system) => {
		const timeFetchSystem = new Date();
		setTimeout( () => {
			var warper = menu.parentNode;
			
			var pos = getPosClickOnMap(event.clientX,event.clientY,map);
			
			/*warper.style.left = (pos[0] - parseInt(menu.style.width)/2.0) +"px";
			warper.style.top  = (pos[1]- parseInt(menu.style.height)/2.0) +"px";*/
			warper.style.left = parseInt(divSystem.style.left) + parseInt(divSystem.offsetWidth /2.0)  - parseInt(menu.offsetWidth)/2.0  + "px";
			warper.style.top  = parseInt(divSystem.style.top)  + parseInt(divSystem.offsetHeight /2.0) - parseInt(menu.offsetHeight)/2.0 + "px";
			
			
			menu.classList.add("openMenu");
			
			var numberOfElement =  system.planets.length;
			menu.innerHTML = "";
			
			var angleStep; // angle step in deg
			var elementAngleSize; // angular size of the element in deg
			
			if (numberOfElement <= 2){ // special transformation
				angleStep = 180; // 360/2
				elementAngleSize = 120;
			}
			else{
				angleStep = 360/numberOfElement;
				elementAngleSize = angleStep;
			}
			var angleStartDiff = 90 - elementAngleSize/2; // starting angle for the first element in deg
			var skewDiff = 90 -  elementAngleSize; // skew of the elment in deg
			
			
			for (let i =0; i < numberOfElement; ++i){
				
				menu.innerHTML += `<div class="menuElement"><span><div><span class="shape" data-type="${system.planets[i].type}"></span></div></span></div>`; // TODO source image 
				
				let div = menu.querySelector(`div.menuElement:nth-child(${i+1})`); // css start counting at one and js start at 0
				div.style.transform = `rotate(${180+angleStartDiff + angleStep*i}deg) skew(${skewDiff}deg)`;
				
			}
			menu.querySelectorAll(`div.menuElement`).forEach( (node) => {
				node.addEventListener('click',planetAddToJourney);
				node.addEventListener('contextmenu',planetAddToJourney);
			});
			menu.querySelectorAll(`div.menuElement > span`).forEach( (node) => {
				node.style.transform = `skew(${-skewDiff}deg) rotate(-180deg)`;
			});
			menu.querySelectorAll(`div.menuElement > span > div`).forEach( (node) => {
				node.style.transform = `rotate(${elementAngleSize/2}deg)`;
			});
			
			divSystem.classList.add('systemWithMenu');
		}, Math.max(delayWanted- (timeFetchSystem.getTime() - timeClosedMenu.getTime()),0) ); // so even if the fect is lengthy we wait less to open the menu
	});
	
	
	
	if (event.type == "contextmenu"){
		event.preventDefault(); // DO not show contexte menue
	}
};

const closeMenu = () => { // safe to call if the menu is already closed
	document.querySelectorAll('.systemWithMenu').forEach( (node) => {
		node.classList.remove('systemWithMenu');
	});
	var menu = document.querySelector("#map > .contextMenuMapWarper > .contextMenuMap");
	menu.classList.remove("openMenu");
};

const planetAddToJourney = (event) => {
	closeMenu();
	console.log(`you added a planet`);
	
	if (event.type == "contextmenu"){
		event.preventDefault(); // DO not show contexte menue
	}
};

class stepPlanerUtils {
	
}
