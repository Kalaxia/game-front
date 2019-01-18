import Faction from '../model/faction';
import Player from '../model/player';
import store from '../store';

export const getFaction = async (id) => {
    const response = await fetch(`/api/factions/${id}`, { 
        method: 'GET',
        headers: store.state.api.headers
    });
    const payload = { response, data: {} };
    await store.dispatch('api/responseMiddleware', payload);

    return new Faction(payload.data);
};

export const getFactions = async() => {
    const response = await fetch(`/api/factions`, {
        method: 'GET',
        headers: store.state.api.headers
    });
    const payload = { response, data: {}};
    await store.dispatch('api/responseMiddleware', payload);

    const factions = new Array();
    for (const factionData of payload.data) {
        factions.push(new Faction(factionData));
    }
    return factions;
};

export const getFactionMembers = async (faction) => {
    const response = await fetch(`/api/factions/${faction.id}/members`, {
        method: 'GET',
        headers: store.state.api.headers
    });
    const payload = { response, data: {}};
    await store.dispatch('api/responseMiddleware', payload);

    faction.members = new Array();
    for (const member of payload.data) {
        faction.members.push(new Player(member));
    }
};