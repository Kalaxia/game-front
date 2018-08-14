import Dictionnary from './core/dictionnary.js';
import Player from './model/player.js';
import Planet from './model/planet.js';
import initMenu from './components/menu/index.js';
import App from './core/app.js';

App.init().then(() => {
    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = `/static/images/factions/${App.getCurrentPlayer().faction.banner}`;
    document.getElementsByTagName('head')[0].appendChild(link);

    Dictionnary.translateTags();


    Array.from(document.getElementsByClassName('not-implemented')).forEach(element => element.addEventListener('click', () => {
        alert(Dictionnary.translations.alerts.not_implemented);
    }));

    initMenu();

});

window.setCurrentFleet = id => localStorage.setItem('current_fleet', id);

window.getCurrentPlanet = () => {
    let currentPlanet;
    if (typeof (currentPlanet = localStorage.getItem('current_planet')) === 'undefined') {
        window.location = '/views/profile';
        return;
    }
    return currentPlanet;
};

window.getCurrentFleet = () => {
    let currentFleet;
    if (typeof (currentFleet = localStorage.getItem('current_fleet')) === 'undefined') {
        window.location = '/views/fleet/fleet-all.html';
        return;
    }
    return currentFleet;
};

Dictionnary.translateTags();
