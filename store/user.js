export const state = () => ({
    actionNotifications: new Array(),
    player: null,
    planets: new Array(),
    currentPlanet: null,
    locale: 'fr',
    screen: {
        width: 0,
        height: 0
    }
});

export const mutations = {
    screenDimensions(state, dimensions) {
        state.screen.width = dimensions.width;
        state.screen.height = dimensions.height;
    },

    addNotification(state, notification) {
        state.player.notifications[notification.type].push(notification);
    },

    addActionNotification: (state, notification) => state.actionNotifications.push(notification),

    removeActionNotification(state, notification) {
        state.actionNotifications.splice(state.actionNotifications.indexOf(notification), 1);
        clearTimeout(notification.timeout);
    },

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
            if (state.player.wallet < price.amount) {
                throw 'alerts.not_enough_money';
            }
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
        state.player.currentPlanet = planet;
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
    },

    updateStorageResource(state, data) {
        if (typeof state.currentPlanet.storage.resources[data.resource] !== 'undefined') {
            state.currentPlanet.storage.resources[data.resource] += data.quantity;
        } else if (data.quantity > 0) {
            state.currentPlanet.storage.resources[data.resource] = data.quantity;
        } else {
            state.currentPlanet.storage.resources[data.resource] = 0;
        }
        if (state.currentPlanet.storage.resources[data.resource] > state.currentPlanet.storage.capacity) {
            state.currentPlanet.storage.resources[data.resource] = state.currentPlanet.storage.capacity;
        }
    }
};

export const actions = {
    async initPlayer({ state, commit }) {
        commit('setPlayer', await this.$repositories.player.getCurrentPlayer());
    },

    async initPlanet({ state, commit }) {
        commit('setPlanets', await this.$repositories.planet.getPlayerPlanets(state.player.id));
        commit('setCurrentPlanet', await this.$repositories.planet.get(state.player.currentPlanet.id));
    },

    async setCurrentPlanet({ commit }, planet) {
        await this.$repositories.planet.setCurrentPlanet(planet.id);
        commit('setCurrentPlanet', await this.$repositories.planet.get(planet.id))
    },

    addActionNotification({ state, commit }, notification) {
        commit('addActionNotification', notification);
        notification.timeout = setTimeout(() => {
            commit('removeActionNotification', notification);
        }, 5000);
    },
};

export const getters = {
    screenDimensions: state => state.screen,

    currentPlayer: state => state.player,

    currentPlanet: state => state.currentPlanet,

    getStoredResource: state => resource => {
        return (typeof state.currentPlanet.storage.resources[resource] !== 'undefined')
            ? state.currentPlanet.storage.resources[resource]
            : 0;
    },

    storedResources: state => state.currentPlanet.storage.resources,

    isStorageEmpty: state => state.currentPlanet.storage.resources.length === 0,

    factionColors: state => state.player.faction.colors
};