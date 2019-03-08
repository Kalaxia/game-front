import { Offer, GOOD_TYPE_RESOURCES } from './offer.js';

class ResourceOffer extends Offer {
    constructor(id, operation, location, createdAt, acceptedAt, quantity, lotQuantity, price, resource) {
        super(id, operation, GOOD_TYPE_RESOURCES, location, parseFloat(price), createdAt, acceptedAt);
        this.quantity = parseInt(quantity);
        this.lotQuantity = parseInt(lotQuantity);
        this.resource = resource;

        this.getPrice = this.getPrice.bind(this);
        this.getTotalPrice = this.getTotalPrice.bind(this);
    }

    // getGoodName() {
    //     return Dictionnary.translations.resources[this.resource];
    // };

    getGoodClass() {
        return '-';
    }

    getQuantity() {
        return `${this.quantity} (${this.lotQuantity})`;
    }

    getPrice() {
        return `${Number(this.getTotalPrice()).toFixed(2)} <img src="/images/picto/G_P_Arr_64px.png" />
            ${this.price} <div><sup><img src="/images/picto/G_P_Mon_64px.png"></sup>
            <span>&frasl;</span>
            <sub>trade.unit_short</sub></div>`
        ;
    }

    getTotalPrice() {
        return this.price * this.quantity;
    }
}

export default ResourceOffer;
