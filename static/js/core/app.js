import Player from '../model/player.js';
import Planet from '../model/planet.js';

class App {
    constructor() {
        this.isInitializing = this.isInitializing.bind(this);
        this.checkInit = this.checkInit.bind(this);
    }

    init() {
        if (this.isInitializing() === true) {
            return this.checkInit();
        }
        this.isStarted = true;
        const app = this;

        return Promise.all([
            Player.fetchCurrentPlayer().then(player => {
                app.currentPlayer = player;
                return player;
            }).then(player => Planet.fetchPlayerPlanets(player))
            .then(planets => Planet.fetch(planets[0].id))
            .then(planet => {
                app.currentPlanet = planet;
                app.isInitialized = true;
                app.isStarted = false;
            })
        ]);
    }

    checkInit() {
        const app = this;
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 50);
        }).then(() => {
            if (app.isInitializing() === true) {
                return app.checkInit();
            }
            return Promise.resolve();
        });
    }

    isInitializing() {
        return (this.isStarted === true && this.isInitialized !== true);
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
