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

    activate(state, isActive) {
        state.player.isActive = isActive;
    },

    spend(state, price) {
        if (price.type === 'credits') {
            state.player.wallet -= price.amount;
        } else if (price.type === 'resource') {
            state.currentPlanet.storage.resources[price.resource] -= price.amount;
        }
    },

    setFaction(state, faction) {
        state.player.faction = faction;
    },

    setPlayer(state, player) {
        state.player = player;
    },

    setGender(state, gender) {
        state.player.gender = gender;
    },

    setAvatar(state, avatar) {
        state.player.avatar = avatar;
    },

    setPseudo(state, pseudo) {
        state.player.pseudo = pseudo;
    },

    setPlanets(state, planets) {
        state.planets = planets;
    },

    setCurrentPlanet(state, planet) {
        state.currentPlanet = planet;
    },

    setCurrentPlayer(state, player) {
        state.player = player;
    },

    setPlanetSetting(state, payload) {
        state.currentPlanet.settings[payload.setting] = payload.value;
    },

    build(state, building) {
        state.currentPlanet.buildings.push(building);

        for (const i in state.currentPlanet.available_buildings) {
            if (state.currentPlanet.available_buildings[i].name === building.name) {
                state.currentPlanet.available_buildings.splice(i, 1);
                break;
            }
        }
    },

    cancelBuilding(state, data) {
        for (const i in state.currentPlanet.buildings) {
            if (state.currentPlanet.buildings[i].id === data.id) {
                state.currentPlanet.buildings.splice(i, 1);
                break;
            }
        }
        state.currentPlanet.available_buildings.push(data.availableBuilding);
    }
};

export const actions = {
    async initPlayer({ state, commit }) {
        commit('setPlayer', await this.$repositories.player.getCurrentPlayer());
    },

    async initPlanet({ state, commit }) {
        commit('setPlanets', await this.$repositories.planet.getPlayerPlanets(state.player.id));
        commit('setCurrentPlanet', await this.$repositories.planet.get(state.planets[0].id));
    }
};

export const getters = {
    getStoredResource: state => resource => {
        return (typeof state.currentPlanet.storage.resources[resource] !== 'undefined')
            ? state.currentPlanet.storage.resources[resource]
            : 0;
    }
};