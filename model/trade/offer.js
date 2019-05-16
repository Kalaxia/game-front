import Planet from '../planet.js';

export const OPERATION_SELL = 'sell';
export const OPERATION_BUY = 'buy';

export const GOOD_TYPE_RESOURCES = 'resources';
export const GOOD_TYPE_SHIPS = 'ships';
export const GOOD_TYPE_MODELS = 'models';

export class Offer {
    constructor(data) {
        this.id = (data.id) ? data.id : null;
        this.operation = data.operation;
        this.location = new Planet(data.location);
        this.price = data.price;
        this.createdAt = new Date(data.created_at);
        this.acceptedAt = (data.accepted_at !== null) ? new Date(data.accepted_at) : null;
    }
};
