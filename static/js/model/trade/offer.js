export const OPERATION_SELL = 'sell';
export const OPERATION_BUY = 'buy';

export const GOOD_TYPE_RESOURCES = 'resources';
export const GOOD_TYPE_SHIPS = 'ships';
export const GOOD_TYPE_MODELS = 'models';

export class Offer {
    constructor(operation, goodType, planet, price) {
        this.operation = operation;
        this.goodType = goodType;
        this.planet = planet;
        this.price = price;
    }
}
