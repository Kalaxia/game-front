import ShipModel from '~/model/ship/model';
import Repository from '~/api/repository';

class ShipRepository extends Repository
{
    async getPlayerShipModels() {
        const payload = await this.call('GET', `/api/me/ship-models`);

        const models = new Array();
        for (const modelData of payload.data) {
            models.push(new ShipModel(modelData));
        }
        return models;
    };
}

export default ShipRepository;