import Repository from '~/api/repository';
import Ship from '~/model/ship/ship';

export default class ShipRepository extends Repository
{
    create(model, planet, quantity) {
        return this.call('POST', `/api/planets/${planet.id}/ships`, {
            model: model,
            quantity: parseInt(quantity)
        });
    }

    async getConstructingShips(planetId) {
        const data = await this.call('GET', `/api/planets/${planetId}/ships/constructing`);

        const ships = new Array();
        for (const ship of data) {
            ships.push(new Ship(ship));
        }
        return ships;
    }
};