import Repository from '~/api/repository';
import ShipFrame from '~/model/ship/frame';
import ShipModel from '~/model/ship/model';
import ShipModule from '~/model/ship/module';

export default class ShipModelRepository extends Repository {
    async get(id) {
        const data = await this.call('GET', `/api/me/ship-models/${id}`);

        data.frame = ShipFrame.createFromSlug(data.frame);
        for (const key in data.slots) {
            if (data.slots[key].module === '') {
                continue;
            }
            data.slots[key].module = ShipModule.createFromSlug(data.slots[key].module);
        }
        return new ShipModel(data);
    }

    async getPlayerModels() {
        const data = await this.call('GET', '/api/me/ship-models');

        const models = new Array();
        for (const model of data) {
            model.frame = ShipFrame.createFromSlug(model.frame);
            models.push(new ShipModel(model));
        }
        return models;
    }

    async create(model) {
        const data = await this.call('POST', '/api/me/ship-models', model.format());

        model.id = data.id;
        model.type = data.type;
        model.slots = data.slots;
    }
};