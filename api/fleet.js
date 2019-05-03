import Ship from '~/model/ship/ship';
import ShipGroup from '~/model/ship/group';
import Fleet from '~/model/fleet/fleet';
import FleetRange from '~/model/fleet/range';
import Repository from '~/api/repository';

export default class FleetRepository extends Repository {
    async createFleet (planetId) {
        return new Fleet(await this.call('POST', `/api/fleets`, { planet_id: planetId }));
    }

    async getFleet(id) {
        return new Fleet(await this.call('GET', `/api/fleets/${id}`));
    }

    async getTravellingFleets() {
        const data = await this.call('GET', '/api/fleets/travelling');
        
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
            quantity: quantity
        });

        fleet.updateShipGroups(shipGroup, data.quantity);
        fleet.location.updateShipGroups(shipGroup, -data.quantity);
    }

    async removeFleet(fleet) {
        await this.call('DELETE', `/api/fleets/${fleet.id}`);
    }

    async getFleetRange(fleet) {
        return new FleetRange(await this.call('GET', `/api/fleets/${fleet.id}/range`));
    }

    sendOnJourney(fleet) {
        return this.call('POST', `/api/fleets/${fleet.id}/journey`, fleet.journey.format());
    }
};