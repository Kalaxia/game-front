import Repository from '~/api/repository';
import ShipConstructionGroup from '~/model/ship/construction_group';

export default class ShipRepository extends Repository
{
    async create(model, planet, quantity) {
        return new ShipConstructionGroup(await this.call('POST', `/api/planets/${planet.id}/ships`, {
            model: model,
            quantity: parseInt(quantity)
        }));
    }

    async getCurrentlyConstructingShips(planetId) {
        const ships = await this.getConstructingShips(planetId);
        
        return (ships.length > 0) ? ships[0]: null;
    }

    async getConstructingShips(planetId) {
        const data = await this.call('GET', `/api/planets/${planetId}/ships/constructing`);

        const ships = new Array();
        for (const ship of data) {
            ships.push(new ShipConstructionGroup(ship));
        }
        return ships;
    }
};