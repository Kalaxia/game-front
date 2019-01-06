import store from '../store';
import Ship from '../model/ship/ship';
import ShipGroup from '../model/ship/group';
import Fleet from '../model/fleet/fleet';
import Journey from '../model/fleet/journey';
import FleetRange from '../model/fleet/range';

export const createFleet = async (planetId) => {
    const response = await fetch(`/api/fleets`, {
        method: 'POST',
        body: JSON.stringify({ planet_id: planetId }),
        headers: store.state.api.headers
    });
    const payload = { response, data: {} };
    await store.dispatch('api/responseMiddleware', payload);
    
    return new Fleet(payload.data);
};

export const getFleet = async (id) => {
    const response = await fetch(`/api/fleets/${id}`, {
        method: 'GET',
        headers: store.state.api.headers
    });
    const payload = { response, data: {} };
    await store.dispatch('api/responseMiddleware', payload);
    
    return new Fleet(payload.data);
};

export const getFleetShips = async (fleet) => {
    const response = await fetch(`/api/fleets/${this.id}/ships`, { 
        method: 'GET',
        headers: store.state.api.headers
    });
    const payload = { response, data: {} };
    await store.dispatch('api/responseMiddleware', payload);

    fleet.ships = new Array();
    for (const shipData of payload.data) {
        fleet.ships.push(new Ship(shipData));
    }
};

export const getFleetShipGroups = async (fleet) => {
    const response = await fetch(`/api/fleets/${fleet.id}/ships/groups`, { 
        method: 'GET',
        headers: store.state.api.headers
    });
    const payload = { response, data: [] };
    await store.dispatch('api/responseMiddleware', payload);

    fleet.shipGroups = new Array();
    for (const groupData of payload.data) {
        fleet.shipGroups.push(new ShipGroup(groupData));
    }
};

export const transferShips = async (fleet, shipGroup, quantity) => {
    const response = await fetch(`/api/fleets/${fleet.id}/ships`, {
        method: 'PATCH',
        body: JSON.stringify({
            'model-id': shipGroup.id,
            quantity: quantity
        }),
        headers: store.state.api.headers
    });
    const payload = { response, data: {}};
    await store.dispatch('api/responseMiddleware', payload);

    fleet.updateShipGroups(shipGroup, payload.data.quantity);
    fleet.location.updateShipGroups(shipGroup, -payload.data.quantity);
};

export const removeFleet = async (fleet) => {
    await fetch(`/api/fleets/${fleet.id}`, {
        method: 'DELETE',
        headers: store.state.api.headers
    });
    const payload = { response, data: {}};
    await store.dispatch('api/responseMiddleware', payload);
}

export const getFleetRange = async (fleet) => {
    const response = await fetch(`/api/fleets/${fleet.id}/range`, {
        method: 'GET',
        headers: store.state.api.headers
    });
    const payload = { response, data: {}};
    await store.dispatch('api/responseMiddleware', payload);

    fleet.range = new FleetRange(payload.data);
};

export const sendOnJourney = async (fleet) => {
    const response = await fetch(`/api/fleets/${fleet.id}/journey`, {
        method: 'POST',
        body: JSON.stringify(fleet.journey.format()),
        headers: store.state.api.headers
    });
    const payload = { response, data: {}};
    await store.dispatch('api/responseMiddleware', payload);

    fleet.journey.steps = payload.data;
};