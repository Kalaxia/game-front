import Dictionnary from '../core/dictionnary.js';
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
                name: Dictionnary.translations.credits,
                picto: 'credits.svg'
            };
            case 'points': return {
                name: Dictionnary.translations.planet.settings.military,
                picto: 'industry_point.svg'
            };
            case 'resource': return {
                name: Dictionnary.translations.resources[this.resource],
                picto: resourcesData[this.resource].picto
            };
        }
    }
}

export default Price;
