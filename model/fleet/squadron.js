import ShipModel from '~/model/ship/model';
import Fleet from '~/model/fleet/fleet';

export default class Squadron {
    constructor(data) {
        this.id = data.id;
        this.shipModel = (data.ship_model) ? new ShipModel(data.ship_model) : null;
        this.fleet = (data.fleet) ? new Fleet(data.fleet) : null;
        this.action = data.action;
        this.position = data.position;
        this.quantity = data.quantity;
    }
}