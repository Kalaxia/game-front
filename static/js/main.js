import Dictionnary from './core/dictionnary.js';
import Player from './model/player.js';

Player.fetchCurrentPlayer().then(player => {
    window.player = player;
});

window.setCurrentPlanet = id => localStorage.setItem('current_planet', id);

window.getCurrentPlanet = () => {
    let currentPlanet;
    if (typeof (currentPlanet = localStorage.getItem('current_planet')) === 'undefined') {
        window.location = '/views/profile';
        return;
    }
    return currentPlanet;
};

Dictionnary.translateTags();
