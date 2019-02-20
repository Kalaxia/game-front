import { Offer, GOOD_TYPE_RESOURCES } from './offer.js';
import resourcesData from '~/resources/resources';

class ResourceOffer extends Offer {
    constructor(id, operation, location, createdAt, acceptedAt, quantity, lotQuantity, price, resource) {
        super(id, operation, GOOD_TYPE_RESOURCES, location, parseFloat(price), createdAt, acceptedAt);
        this.quantity = parseInt(quantity);
        this.lotQuantity = parseInt(lotQuantity);
        this.resource = resource;

        this.getPrice = this.getPrice.bind(this);
        this.getTotalPrice = this.getTotalPrice.bind(this);
    }

    create() {
        return fetch(`/api/planets/${this.location.id}/offers`, {
            method: "POST",
            body: JSON.stringify({
                operation: this.operation,
                good_type: this.goodType,
                planet: this.location,
                quantity: this.quantity,
                lot_quantity: this.lotQuantity,
                price: this.price,
                resource: this.resource,
            })
        });
    }

    // getGoodName() {
    //     return Dictionnary.translations.resources[this.resource];
    // };

    getGoodPicto() {
        return `/static/images/resources/${resourcesData[this.resource].picto}`;
    };

    getGoodClass() {
        return '-';
    }

    getQuantity() {
        return `${this.quantity} (${this.lotQuantity})`;
    }

    getPrice() {
        return `${Number(this.getTotalPrice()).toFixed(2)} <img src="/static/images/picto/G_P_Arr_64px.png" />
            ${this.price} <div><sup><img src="/static/images/picto/G_P_Mon_64px.png"></sup>
            <span>&frasl;</span>
            <sub>trade.unit_short</sub></div>`
        ;
    }

    getTotalPrice() {
        return this.price * this.quantity;
    }
}

export default ResourceOffer;
