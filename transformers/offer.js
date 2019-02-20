import ResourceOffer from '~/model/trade/resource_offer.js';
import ShipOffer from '~/model/trade/ship_offer.js';
import ModelOffer from '~/model/trade/model_offer.js';

export const transformArray = data => data.map(transform);

export const transform = offer => {
    if (typeof offer.resource !== 'undefined') {
        return new ResourceOffer(offer.id, offer.operation, offer.location, offer.created_at, offer.accepted_at, offer.quantity, offer.lot_quantity, offer.price, offer.resource);
    } else if (typeof offer.quantity !== 'undefined') {
        return new ShipOffer(offer.id, offer.operation, offer.location, offer.created_at, offer.accepted_at, offer.quantity, offer.lot_quantity, offer.price, offer.model);
    } else {
        return new ModelOffer(offer.id, offer.operation, offer.location, offer.created_at, offer.accepted_at, offer.price, offer.model);
    }
};
