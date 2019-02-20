export const state = () => ({
    player: null,
    planets: new Array(),
    currentPlanet: null,
    locale: 'fr'
});

export const mutations = {
    addPlanet(state, planet) {
        if (state.planets === null) {
            state.planets = new Array();
        }
        state.planets.push(planet);
        if (state.planets.length === 1) {
            state.currentPlanet = planet;
        }
    },

    setFaction(state, faction) {
        state.player.faction = faction;
    },

    setPlayer(state, player) {
        state.player = player;
    },

    setPlanets(state, planets) {
        state.planets = planets;
    },

    setCurrentPlanet(state, planet) {
        state.currentPlanet = planet;
    }
};

export const actions = {
    async initPlayer({ state, commit }) {
        commit('setPlayer', await this.$repositories.player.getCurrentPlayer());

        if (!state.player.isActive) {
            this.app.router.push('/registration');
        }
    },

    async initPlanet({ state, commit }) {
        commit('setPlanets', await this.$repositories.planet.getPlayerPlanets(state.player.id));
        commit('setCurrentPlanet', await this.$repositories.planet.getPlanet(state.planets[0].id));
    }
};

export const getters = {
    getStoredResource: state => resource => {
        return (typeof state.currentPlanet.storage.resources[resource] !== 'undefined')
            ? state.currentPlanet.storage.resources[resource]
            : 0;
    }
};