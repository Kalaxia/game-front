import resourcesData from '../resources/resources';

class Price {
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

    getInfos() {
        switch (this.type) {
            case 'credits': return {
                name: 'credits',
                picto: 'credits.svg'
            };
            case 'points': return {
                name: 'planet.settings.military',
                picto: 'industry_point.svg'
            };
            case 'resource': return {
                name: this.resource,
                picto: resourcesData[this.resource].picto
            };
        }
    }
}

export default Price;
