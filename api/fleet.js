import Ship from '~/model/ship/ship';
import ShipGroup from '~/model/ship/group';
import Fleet from '~/model/fleet/fleet';
import FleetRange from '~/model/fleet/range';
import Repository from '~/api/repository';

class FleetRepository extends Repository
{
    async createFleet (planetId) {
        const payload = await this.call('POST', `/api/fleets`, { planet_id: planetId });
        
        return new Fleet(payload.data);
    }

    async getFleet(id) {
        const payload = await this.call('GET', `/api/fleets/${id}`);
        
        return new Fleet(payload.data);
    }

    async getFleetShips(fleet) {
        const payload = await this.call('GET', `/api/fleets/${this.id}/ships`);

        fleet.ships = new Array();
        for (const shipData of payload.data) {
            fleet.ships.push(new Ship(shipData));
        }
    }

    async getFleetShipGroups(fleet) {
        const payload = await this.call('GET', `/api/fleets/${fleet.id}/ships/groups`);

        fleet.shipGroups = new Array();
        for (const groupData of payload.data) {
            fleet.shipGroups.push(new ShipGroup(groupData));
        }
    }

    async transferShips(fleet, shipGroup, quantity) {
        const payload = await this.call('PATH', `/api/fleets/${fleet.id}/ships`, {
            'model-id': shipGroup.id,
            quantity: quantity
        });

        fleet.updateShipGroups(shipGroup, payload.data.quantity);
        fleet.location.updateShipGroups(shipGroup, -payload.data.quantity);
    }

    async removeFleet(fleet) {
        const payload = await this.call('DELETE', `/api/fleets/${fleet.id}`);
    }

    async getFleetRange(fleet) {
        const payload = await this.call('GET', `/api/fleets/${fleet.id}/range`);

        fleet.range = new FleetRange(payload.data);
    }

    async sendOnJourney(fleet) {
        const payload = await this.call('POST', `/api/fleets/${fleet.id}/journey`, fleet.journey.format());

        fleet.journey.steps = payload.data;
    }
}

export default FleetRepository;