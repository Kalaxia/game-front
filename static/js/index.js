import Api from './core/api.js';
import Player from './model/player.js';

window.addEventListener("load", () => Api.initializationPromise.then(() => Player.fetchCurrentPlayer().then(player => {
    window.location = (player.isActive === true) ? '/views/overview' : '/views/register';
})));
