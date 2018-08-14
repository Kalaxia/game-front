import Dictionnary from './core/dictionnary.js';


import Planet from './model/planet.js';


const planetId = window.getCurrentPlanet();

export const initBaseForHangar = () => Planet.fetch(planetId).then(planet => {
    
    
    document.querySelector('#planet-data > header > h1').innerHTML = Dictionnary.translations.planet.fleet.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}">${planet.name}</a>`);
	document.querySelector('#ships-view > section > h3').innerHTML = Dictionnary.translations.planet.fleet.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}">${planet.name}</a>`);
});

