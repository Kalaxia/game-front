import Repository from '~/api/repository';
import ShipFrame from '~/model/ship/frame';
import ShipModel from '~/model/ship/model';
import ShipModule from '~/model/ship/module';

export default class ShipModelRepository extends Repository {
    async get(id) {
        const payload = await this.call('GET', `/api/me/ship-models/${id}`);

        payload.data.frame = ShipFrame.createFromSlug(data.frame);
        for (const key in payload.data.slots) {
            if (payload.data.slots[key].module === '') {
                continue;
            }
            payload.data.slots[key].module = ShipModule.createFromSlug(payload.data.slots[key].module);
        }
        return new ShipModel(data);
    }

    async getPlayerModels() {
        const payload = await this.call('GET', '/api/me/ship-models');

        const models = new Array();
        for (const data of payload.data) {
            data.frame = ShipFrame.createFromSlug(data.frame);
            models.push(new ShipModel(data));
        }
        return models;
    }

    async create(model) {
        const payload = await this.call('POST', '/api/me/ship-models', model.format());

        model.id = payload.data.id;
        model.type = payload.data.type;
        model.slots = payload.data.slots;
    }
};