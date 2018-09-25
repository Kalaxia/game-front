import Dictionnary from './core/dictionnary.js';

import Fleet from './model/fleet.js';
import Planet from './model/planet.js';
import Player from './model/player.js';
import System from './model/system.js';
import App from './core/app.js';
import Utils from './utils/utils.js';
import Journey from './model/journey.js';

import { mapScale, minimapScale,mapSize } from './map.js';

var rangeData;
var currentFleet;
var isPlaner = false; // set if we see the planer

Array.prototype.last = function () {
	return this[this.length-1];
};

class PositionUtils{
	// TODO comment
	constructor(x, y, planetId){
		this.x = x;
		this.y = y;
		this.planetId = planetId;
	}
}

class StepPlanerUtils {
	// TODO comment
	constructor(){
		this.positionArray = [];
	}
	
	addStep (x, y, planetId) {
		if (planetId == 0 && (x < 0 || y <0 || x > mapSize || y > mapSize) ){
			throw "invalid Position";
		}
		var usedX = x;
		var usedY = y;
		if (planetId != 0){
			var menu = document.querySelector(`div[planet-id='${planetId}']`).parentNode;
			var warper = menu.parentNode; 
			var planetX = (parseInt(warper.style.left) + parseInt(menu.offsetWidth)/2)/mapScale;
			var planetY = (parseInt(warper.style.top) + parseInt(menu.offsetHeight)/2)/mapScale; // not the best way to retrive the position :( 
			// TODO see better way to do this (global variable? html atribute ?)
			usedX = planetX;
			usedY = planetY;
		}
		
		var previousX = this.getPreviousX();
		var previousY = this.getPreviousY();
		
		
		
		var distance = Math.sqrt( Math.pow(usedX - previousX, 2) + Math.pow(usedY-previousY, 2) );
		
		var rangeForNextStep = this.getRangeForNextStep(usedX, usedY, planetId);
		
		if (distance <= rangeForNextStep){
			if (typeof planetId == "number"){
				planetId = planetId.toString();
			}
			this.positionArray.push(new PositionUtils(usedX,usedY,planetId)); // ok if planet id is not 0 the x and y can be arbitrary 
			// Draw the line
			
			var lineDiv = document.createElement("div");
			lineDiv.classList.add('line');
			lineDiv.setAttribute('step-number',`${this.positionArray.length}`);
			Utils.drawLinePosition([previousX*mapScale,previousY*mapScale],[usedX*mapScale,usedY*mapScale],lineDiv);
			var map = document.querySelector('#map');
			map.appendChild(lineDiv);
			if (planetId == 0){
				var point = document.createElement("div");
				point.classList.add("point");
				point.innerHTML = `<div class="point-inner-1"></div><div class="point-inner-2"></div>`;
				
				const SIZE_BOX_POINT = 20; // defiened in thhe css 
				
				point.style.left = usedX * mapScale - SIZE_BOX_POINT/2 +"px";
				point.style.top = usedY * mapScale - SIZE_BOX_POINT/2 +"px";
				
				point.style.width = SIZE_BOX_POINT+"px";
				point.style.height = SIZE_BOX_POINT+"px";
				point.setAttribute('step-number',`${this.positionArray.length}`);
				map.appendChild(point);
			}
			document.querySelector('#send-fleet-button').classList.remove('deactivate');
			document.querySelector('#remove-last-step').classList.remove('deactivate');
			var rangeCircle = document.querySelector('.range-circle');
			rangeCircle.style.left = usedX*mapScale - parseInt(rangeCircle.offsetWidth)/2 +"px";
			rangeCircle.style.top = usedY*mapScale - parseInt(rangeCircle.offsetHeight)/2 +"px";
			
		}
		else{
			//TODO
			throw "out of range"
		}
		
		
	}
	
	addPlanet(planetId){
		this.addStep(0,0,planetId);
	}
	
	addPosition(x,y){
		this.addStep(x,y,0);
	}
	
	
	toJSON(){
		return JSON.stringify(this.positionArray);
	}
	
	sendRequestStartJourney(fleetId) {
		if (this.positionArray.length > 0){
			return currentFleet.sendOnJourney(this.positionArray);
		}
	}
	
	getPreviousX(){
		if (this.positionArray.length != 0){
			return this.positionArray.last().x;
		}
		else{
			if (currentFleet.location != null && currentFleet.location != undefined){
				return currentFleet.location.system.coord_x;
			}
			else{
				return currentFleet.map_pos_x;
			}
		}
	}
	
	getPreviousY(){
		if (this.positionArray.length != 0){
			return this.positionArray.last().y;
		}
		else{
			if (currentFleet.location != null && currentFleet.location != undefined){
				return currentFleet.location.system.coord_y;
			}
			else{
				return currentFleet.map_pos_y;
			}
		}
	}
	
	getPreviousPlanetId(){
		if (this.positionArray.length != 0){
			return this.positionArray.last().planetId;
		}
		else{
			if (currentFleet.location != null && currentFleet.location != undefined){
				return currentFleet.location.id;
			}
			else{
				return 0;
			}
		}
	}
	
	getRangeForNextStep(x, y, planetId){
		var previousX = this.getPreviousX();
		var previousY = this.getPreviousY();
		var previousPlanetId = this.getPreviousPlanetId();
		
		if (previousPlanetId.planetId != 0) {
			if (planetId != 0) {
				if (previousX == x && previousY == y  ) {
					return rangeData.same_system ;
				}
				else{
					return rangeData.planet_to_planet;
				}
			}
			else{
				return rangeData.planet_to_position;
			}
		}
		else{
			if (planetId != 0) {
				return rangeData.position_to_planet;
			}
			else{
				return rangeData.position_to_position;
			}
		}
	}
	
	removeLastStep () {
		if (this.positionArray.length > 0){
			document.querySelectorAll(`[step-number='${this.positionArray.length}']`).forEach( (node) => {
				node.remove();
			});
			this.positionArray.pop();
			var rangeCircle = document.querySelector('.range-circle');
			rangeCircle.style.left = this.getPreviousX()*mapScale - parseInt(rangeCircle.offsetWidth)/2 +"px";
			rangeCircle.style.top = this.getPreviousY()*mapScale - parseInt(rangeCircle.offsetHeight)/2 +"px";
		}
		
		if (this.positionArray.length == 0){ // do not forget that previsly we pop the last element so this can trigger even if the last if did (if this.positionArray.length was previsly 1)
			document.querySelector('#send-fleet-button').classList.add('deactivate');
			document.querySelector('#remove-last-step').classList.add('deactivate');
			
		}
		
		
	}
	
}

var stepUtils = new StepPlanerUtils();


const OFFSET_SIZE_TARGET = -17; // -7 :  (widthExtene - widthIntern)/2 + boder width
// width : 30 border-width : 1

export const initJourneyView = (id) => {
	// TODO comment
	Fleet.fetch(id).then( (fleet) => {
		currentFleet = fleet;
		currentFleet.fetchRange().then( (range) => {
			document.querySelector('#remove-last-step').addEventListener('click', (event) => { stepUtils.removeLastStep(); }); // I need to use the arrow function other wise the "this" is infact the button
			document.querySelector('#send-fleet-button').addEventListener('click', sendFleet);
			rangeData = range;
			if (fleet.journey == null || fleet.journey == undefined || fleet.journey.id == null ||  fleet.journey.id == undefined){
				if (fleet.location != null && fleet.location != undefined) {
					document.querySelectorAll(`#map [data-id='${fleet.location.system.id}']`).forEach( node => {
						
						node.classList.add("fleet-location");
						node.style.top = parseInt(node.style.top)-2+"px";  //-2 to repos correctly due to border width
					    node.style.left = parseInt(node.style.left)-2+"px";
						var systemElementTraget = document.createElement("div");
					    systemElementTraget.classList.add('fleet-location-target');
					    systemElementTraget.style.top = (fleet.location.system.coord_y * mapScale + OFFSET_SIZE_TARGET) + 'px';
					    systemElementTraget.style.left = (fleet.location.system.coord_x * mapScale + OFFSET_SIZE_TARGET) + 'px';
						systemElementTraget.innerHTML = `<div class="north"></div> <div class="south"></div> <div class="east"></div> <div class="west"></div>`;
						node.parentNode.appendChild(systemElementTraget);
						
						var rangeCircle = getRangeCircleElement(fleet.location.system.coord_x, fleet.location.system.coord_y, range);
						node.parentNode.appendChild(rangeCircle);
					});
				}
				else{
					var fleetPosition = document.createElement("div");
					const DIV_SIZE = 30;
					fleetPosition.classList.add('fleet-position');
					fleetPosition.style.top = (fleet.map_pos_y * mapScale - DIV_SIZE/2) + 'px';
					fleetPosition.style.left = (fleet.map_pos_x * mapScale - DIV_SIZE/2) + 'px';
					fleetPosition.style.width = DIV_SIZE+"px"; // I juste choose one
					fleetPosition.style.height = DIV_SIZE + "px"; // time 2 because I give a radius and the
					
					var rangeCircle = getRangeCircleElement(fleet.map_pos_x, fleet.map_pos_y, range);
					var map = document.querySelector('#map');
					map.appendChild(fleetPosition);
					map.appendChild(rangeCircle);
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

const getRangeCircleElement = (x,y,range) => {
	var rangeCircle = document.createElement("div");
	rangeCircle.style.width = range.planet_to_planet*mapScale*2+"px"; // I juste choose one
	rangeCircle.style.height = range.planet_to_planet*mapScale*2+"px"; // time 2 because I give a radius and the width / height is a diameter
	const BORDER_WIDTH = 6;
	rangeCircle.style.top = (y * mapScale - parseInt(rangeCircle.style.height)/2 - BORDER_WIDTH/2) + 'px';
	rangeCircle.style.left = (x * mapScale - parseInt(rangeCircle.style.width)/2 - BORDER_WIDTH/2) + 'px';
	rangeCircle.style["border-width"] = BORDER_WIDTH + "px";
	rangeCircle.classList.add('range-circle');
	
	return rangeCircle;
};

const sendFleet = (event) => {
	stepUtils.sendRequestStartJourney().then( (steps) => { location.reload(); }); // TEMP
};

export const initJourneyViewForPlaner = (id) => {
	isPlaner = true;
	initJourneyView(id);
	
};

const getPosClickOnMap = (eventX, eventY, mapNode) => {
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
		
		//console.log(`you clicked on position (${pos[0]/mapScale}, ${pos[1]/mapScale})`);
		stepUtils.addPosition(pos[0]/mapScale,pos[1]/mapScale);
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
	
	//console.log(`you clicked on system ${systemId}`);
	
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
				var factionIdAtribute =0 ;
				var factionColor = "darkgrey";
				
				if (system.planets[i].player != null && system.planets[i].player != undefined){
					factionIdAtribute = system.planets[i].player.faction.id;
					factionColor = system.planets[i].player.faction.color;
				}
				div.setAttribute("planet-id",`${system.planets[i].id}`);
				div.setAttribute("faction-id",`${factionIdAtribute}`);
				//div.setAttribute("faction-color",factionColor);
				div.style["background-color"] = factionColor;
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
	
	//console.log(`you added a planet`);
	closeMenu();
	stepUtils.addPlanet(event.currentTarget.getAttribute("planet-id"));
	if (event.type == "contextmenu"){
		event.preventDefault(); // DO not show contexte menue
	}
};
