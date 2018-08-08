import Player from '../model/player.js';
import Planet from '../model/planet.js';

class App {
    init() {
        const app = this;

        return Promise.all([
            Player.fetchCurrentPlayer().then(player => {
                app.currentPlayer = player;
                return player;
            }).then(player => Planet.fetchPlayerPlanets(player.id))
            .then(planets => Planet.fetch(planets[0].id))
            .then(planet => {
                app.currentPlanet = planet;
            })
        ]);
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    getCurrentPlanet() {
        return this.currentPlanet;
    }
}

const app = new App();

export default app;
