export default class Price {
    constructor(data) {
        this.type = data.type;
        this.resource = data.resource;
        this.amount = data.amount;
    }

    static format(priceData) {
        const prices = new Array();

        for (const price of priceData) {
            prices.push(new Price(price));
        }
        return prices;
    }
};