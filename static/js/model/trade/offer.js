import Dictionnary from '../../core/dictionnary.js';
import Api from '../../core/api.js';
import resourcesData from '../../resources/resources';
import Planet from '../planet.js';

export const OPERATION_SELL = 'sell';
export const OPERATION_BUY = 'buy';

export const GOOD_TYPE_RESOURCES = 'resources';
export const GOOD_TYPE_SHIPS = 'ships';
export const GOOD_TYPE_MODELS = 'models';

export class Offer {
    constructor(id, operation, goodType, location, price, createdAt, acceptedAt) {
        this.id = id;
        this.operation = operation;
        this.goodType = goodType;
        this.location = new Planet(location);
        this.price = price;
        this.createdAt = new Date(createdAt);
        this.acceptedAt = (acceptedAt !== null) ? new Date(acceptedAt) : null;
    }

    static fetchAll(operation) {
        return fetch('/api/offers', {
            method: 'POST',
            body: JSON.stringify({
                operation: operation
            }),
            headers: Api.headers
        }).then(Api.responseMiddleware);
    }

    static cancel(id) {
        return fetch(`/api/offers/${id}`, {
            method: 'DELETE',
            headers: Api.headers
        }).then(Api.responseMiddleware);
    }
};
