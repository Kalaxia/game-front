import ShipModel from '~/model/ship/model';

export default class Squadron {
    constructor(data) {
        this.id = data.id;
        this.shipModel = (data.ship_model) ? new ShipModel(data.ship_model) : null;
        this.position = data.position;
        this.quantity = data.quantity;
    }
}