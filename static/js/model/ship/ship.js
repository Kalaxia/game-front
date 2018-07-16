import Api from '../../core/api.js';
import ShipModel from './model.js';

class Ship {
    constructor(data) {
        this.model = data.model;
        this.hangar = data.hangar;
    }

    create(quantity) {
        console.log('CREATION');
        return fetch(`/api/planets/${this.hangar.id}/ships`, {
            method: 'POST',
            body: JSON.stringify({
                model: this.model,
                quantity: parseInt(quantity)
            }),
            headers: Api.headers
        }).then(Api.responseMiddleware);
    }
}

export default Ship;
