import Api from '../../core/api.js';
import ShipFrame from './frame.js';
import ShipModule from './module.js';

class ShipModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.frame = data.frame;
        this.type = data.type;
        this.slots = data.slots;
    }

    static fetch(id) {
        return fetch(`/api/me/ship-models/${id}`, {
            method: 'GET',
            headers: Api.headers
        })
        .then(Api.responseMiddleware)
        .then(data => {
            data.frame = ShipFrame.createFromSlug(data.frame);
            for (const key in data.slots) {
                if (data.slots[key].module === '') {
                    continue;
                }
                data.slots[key].module = ShipModule.createFromSlug(data.slots[key].module);
            }
            return new ShipModel(data);
        });
    }

    static fetchPlayerModels() {
        return fetch('/api/me/ship-models', {
            method: 'GET',
            headers: Api.headers
        })
        .then(Api.responseMiddleware)
        .then(data => {
            const result = new Array();
            for (const shipModelData of data) {
                shipModelData.frame = ShipFrame.createFromSlug(shipModelData.frame);
                result.push(new ShipModel(shipModelData));
            }
            return result;
        });
    }

    create() {
        return fetch('/api/me/ship-models', {
            method: 'POST',
            headers: Api.headers,
            body: JSON.stringify(this.format())
        }).then(Api.responseMiddleware)
    }

    format() {
        const slots = new Array();
        for (const slotPosition in this.slots) {
            const slot = this.slots[slotPosition];
            slot.module = slot.module.slug;
            slots.push(slot);
        }
        return {
            name: this.name,
            frame: this.frame.slug,
            slots: slots
        };
    }
}

export default ShipModel;
