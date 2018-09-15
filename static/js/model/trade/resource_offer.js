import { Offer, GOOD_TYPE_RESOURCES } from './offer.js';
import Api from '../../core/api.js';

class ResourceOffer extends Offer {
    constructor(operation, planet, quantity, lotQuantity, price, resource) {
        super(operation, GOOD_TYPE_RESOURCES, planet, parseFloat(price));
        this.quantity = parseInt(quantity);
        this.lotQuantity = parseInt(lotQuantity);
        this.resource = resource;
    }

    create() {
        return fetch(`/api/planets/${this.planet.id}/offers`, {
            method: "POST",
            body: JSON.stringify({
                operation: this.operation,
                good_type: this.goodType,
                planet: this.planet,
                quantity: this.quantity,
                lot_quantity: this.lotQuantity,
                price: this.price,
                resource: this.resource,
            }),
            headers: Api.headers
        }).then(Api.responseMiddleware);
    }
}

export default ResourceOffer;
