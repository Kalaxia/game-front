import ResourceOffer from '~/model/trade/resource_offer.js';
import ShipOffer from '~/model/trade/ship_offer.js';
import ModelOffer from '~/model/trade/model_offer.js';

export const transformArray = data => data.map(transform);

export const transform = offer => {
    if (typeof offer.resource !== 'undefined') {
        return new ResourceOffer(offer);
    } else if (typeof offer.quantity !== 'undefined') {
        return new ShipOffer(offer);
    } else {
        return new ModelOffer(offer);
    }
};
