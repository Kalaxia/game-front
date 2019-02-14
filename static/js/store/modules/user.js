import Player from '../../model/player';
import Planet from '../../model/planet';
import router from '../../router';

export default {
    namespaced: true,

    state: {
        player: null,
        planets: new Array(),
        currentPlanet: null,
    },

    mutations: {
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
        }
    },

    actions: {
        async initPlayer({ state, dispatch, rootState }) {
            const response = await fetch('/api/me', {
                method: 'GET',
                headers: rootState.api.headers
            });
            const payload = { response, data: {} };
            await dispatch('api/responseMiddleware', payload, { root: true });
            state.player = new Player(payload.data);

            if (!state.player.isActive) {
                router.push('/registration');
            }
        },

        async initPlanet({ state, dispatch, rootState }) {
            let response = await fetch(`/api/players/${state.player.id}/planets`, {
                method: 'GET',
                headers: rootState.api.headers
            });
            let payload = { response, data : {} };
            await dispatch('api/responseMiddleware', payload, { root: true });
            state.planets = payload.data;
            
            response = await fetch(`/api/planets/${state.planets[0].id}`, {
                method: 'GET',
                headers: rootState.api.headers
            });
            payload = { response, data: {}};
            await dispatch('api/responseMiddleware', payload, { root: true });
            state.currentPlanet = new Planet(payload.data);
        }
    },

    getters: {
        getStoredResource: state => resource => {
            return (typeof state.currentPlanet.storage.resources[resource] !== 'undefined')
                ? state.currentPlanet.storage.resources[resource]
                : 0;
        }
    }
};