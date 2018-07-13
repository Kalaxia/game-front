import Player from './model/player.js';

window.addEventListener("load", () => {
    Player.fetchCurrentPlayer().then(player => {
        window.location = (player.is_active) ? '/views/profile' : '/views/register';
    });
});
