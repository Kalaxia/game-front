import store from '../store';
import ShipGroup from '../model/ship/group';
import Planet from '../model/planet';

export const getPlanet = async (id) => {
    const response = await fetch(`/api/planets/${id}`, {
        method: 'GET',
        headers: store.state.api.headers
    });
    const payload = { response, data: {}};
    await store.dispatch('api/responseMiddleware', payload);

    return new Planet(payload.data);
};

export const fetchHangarShipGroups = async (planet) => {
    const response = await fetch(`/api/planets/${planet.id}/ships/groups`, { 
        method: 'GET',
        headers: store.state.api.headers
    });
    const payload = { response, data: [] };
    await store.dispatch('api/responseMiddleware', payload);
    planet.shipGroups = new Array();
    for (const groupData of payload.data) {
        planet.shipGroups.push(new ShipGroup(groupData));
    }
}

export const getFactionPlanetChoices = async (faction) => {
    const response = await fetch(`/api/factions/${faction.id}/planet-choices`, {
        method: 'GET',
        headers: store.state.api.headers
    });
    const payload = { response, data: [] };
    await store.dispatch('api/responseMiddleware', payload);

    const planets = new Array();
    for (const planetData of payload.data) {
        planets.push(new Planet(planetData));
    }
    return planets;
}