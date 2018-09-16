import ResourceOffer from '../model/trade/resource_offer.js';
import ShipOffer from '../model/trade/ship_offer.js';
import ModelOffer from '../model/trade/model_offer.js';

export const transformArray = data => data.map(transform);

export const transform = offer => {
    if (typeof offer.resource !== 'undefined') {
        return new ResourceOffer(offer.operation, offer.location, offer.quantity, offer.lot_quantity, offer.price, offer.resource);
    } else if (typeof offer.quantity !== 'undefined') {
        return new ShipOffer(offer.operation, offer.location, offer.quantity, offer.lot_quantity, offer.price, offer.model);
    } else {
        return new ModelOffer(offer.operation, offer.location, offer.price, offer.model);
    }
};
