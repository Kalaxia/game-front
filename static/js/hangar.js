import Dictionnary from './core/dictionnary.js';
import Planet from './model/planet.js';
import Player from './model/player.js';
import App from './core/app.js';
import { getHTMLShipArrayStringHangar, UniqueModelList } from './ship.js';

export const initBaseForHangar = () => {
    const planet = App.getCurrentPlanet();
	document.querySelector('#ships-view > section > h3').innerHTML = Dictionnary.translations.planet.hangar.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}" class="planet">${planet.name}</a>`);

    Planet.fetchShips(planet.id).then( ships => {
       document.querySelector('#ships-view > .ships-list > div.ships-table').innerHTML= getHTMLShipArrayStringHangar(ships); //< make the table for ships in hangar
   });
};
