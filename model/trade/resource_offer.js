import { Offer, GOOD_TYPE_RESOURCES } from './offer.js';

class ResourceOffer extends Offer {
    constructor(data) {
        super(data);

        this.goodType = GOOD_TYPE_RESOURCES;
        this.quantity = data.quantity,
        this.lotQuantity = data.lot_quantity,
        this.resource = data.resource;

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
