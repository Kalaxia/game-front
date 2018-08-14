import Dictionnary from './core/dictionnary.js';


import Planet from './model/planet.js';
import Player from './model/player.js';
import App from './core/app.js';
import { getHTMLShipArrayStringHangar, UniqueModelList } from './ship.js';



//const planetId = App.getCurrentPlanet(); //< does not work
//const planetId = window.getCurrentPlanet();

//Planet.fetch(planetId).then(planet => 
export const initBaseForHangar = () => {
    
    const planet = App.getCurrentPlanet();
    document.querySelector('#planet-data > header > h1').innerHTML = Dictionnary.translations.planet.fleet.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}">${planet.name}</a>`);
	document.querySelector('#ships-view > section > h3').innerHTML = Dictionnary.translations.planet.fleet.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}">${planet.name}</a>`);
    
    var player = App.getCurrentPlayer();    
    
    var profileLink = document.createElement('a');
    profileLink.href = '/views/profile';
    profileLink.innerText = player.pseudo;
    document.querySelector("#player-data h3").appendChild(profileLink);
	document.querySelector('#logout').addEventListener('click', () => {
		Player.logout();
	});
    
    Planet.fetchShips(planet.id).then( ships => {
       document.querySelector('#ships-view > .ships-list > div.ships-table').innerHTML= getHTMLShipArrayStringHangar(ships); //< make the table for ships in hangar
   });

	
    
    
    
};
