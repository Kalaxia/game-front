import Ship from '~/model/ship/ship';
import ShipGroup from '~/model/ship/group';
import Squadron from '~/model/fleet/squadron';
import Fleet from '~/model/fleet/fleet';
import FleetRange from '~/model/fleet/range';
import Journey from '~/model/fleet/journey';
import Repository from '~/api/repository';

export default class FleetRepository extends Repository {
    async createFleet (planetId) {
        return new Fleet(await this.call('POST', `/api/fleets`, { planet_id: planetId }));
    }

    async getFleet(id) {
        return new Fleet(await this.call('GET', `/api/fleets/${id}`));
    }

    async calculateFleetTravelDuration(fleet, step) {
        return this.call('POST', `/api/fleets/${fleet.id}/travel-duration`, { ...step });
    }

    async getTravellingFleets() {
        const data = await this.call('GET', '/api/fleets/travelling');
        
        const fleets = new Array();
        for (const fleet of data) {
            fleets.push(new Fleet(fleet));
        }
        return fleets;
    }

    async getPlanetFleets(planetId) {
        const data = await this.call('GET', `/api/planets/${planetId}/fleets`);
        
        const fleets = new Array();
        for (const fleet of data) {
            fleets.push(new Fleet(fleet));
        }
        return fleets;
    }

    async getComingFleets(planetId) {
        const data = await this.call('GET', `/api/planets/${planetId}/fleets/coming`);
        
        const fleets = new Array();
        for (const fleet of data) {
            fleets.push(new Fleet(fleet));
        }
        return fleets;
    }

    async getLeavingFleets(planetId) {
        const data = await this.call('GET', `/api/planets/${planetId}/fleets/leaving`);
        
        const fleets = new Array();
        for (const fleet of data) {
            fleets.push(new Fleet(fleet));
        }
        return fleets;
    }

    async getFleets() {
        const data = await this.call('GET', `/api/fleets`);

        const fleets = new Array();
        for (const fleet of data) {
            fleets.push(new Fleet(fleet));
        }
        return fleets;
    }

    async getFleetShips(fleet) {
        const data = await this.call('GET', `/api/fleets/${this.id}/ships`);

        fleet.ships = new Array();
        for (const shipData of data) {
            fleet.ships.push(new Ship(shipData));
        }
    }

    async getFleetShipGroups(fleet) {
        const data = await this.call('GET', `/api/fleets/${fleet.id}/ships/groups`);

        fleet.shipGroups = new Array();
        for (const groupData of data) {
            fleet.shipGroups.push(new ShipGroup(groupData));
        }
    }

    async transferShips(fleet, shipGroup, quantity) {
        const data = await this.call('PATCH', `/api/fleets/${fleet.id}/ships`, {
            'model-id': shipGroup.id,
            quantity
        });

        fleet.updateShipGroups(shipGroup, data.quantity);
        fleet.place.planet.updateShipGroups(shipGroup, -data.quantity);
    }

    async createSquadron(fleet, modelId, position, quantity) {
        const data = await this.call('POST', `/api/fleets/${fleet.id}/squadrons`, {
            'ship_model_id': modelId,
            position,
            quantity
        });
        return new Squadron(data);
    }

    async updateSquadron(fleet, squadron) {
        await this.call('PATCH', `/api/fleets/${fleet.id}/squadrons/${squadron.id}`, {
            quantity: squadron.quantity
        });
        return squadron;
    }

    async getSquadrons(fleet) {
        const data = await this.call('GET', `/api/fleets/${fleet.id}/squadrons`);

        fleet.squadrons = data.map(s => new Squadron(s));
    }

    async removeFleet(fleet) {
        await this.call('DELETE', `/api/fleets/${fleet.id}`);
    }

    async getFleetRange(fleet) {
        return new FleetRange(await this.call('GET', `/api/fleets/${fleet.id}/range`));
    }

    async sendOnJourney(fleet) {
        return new Journey(await this.call('POST', `/api/fleets/${fleet.id}/journey`, fleet.journey.format()));
    }

    loadCargo(fleet, data) {
        return this.call('PATCH', `/api/fleets/${fleet.id}/load-cargo`, {
            planet_id: parseInt(data.planet.id),
            resource: data.resource,
            quantity: parseInt(data.quantity)
        });
    }

    unloadCargo(fleet, data) {
        return this.call('PATCH', `/api/fleets/${fleet.id}/unload-cargo`, {
            planet_id: parseInt(data.planet.id),
            resource: data.resource,
            quantity: parseInt(data.quantity)
        });
    }
};