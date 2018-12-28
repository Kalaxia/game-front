import Api from '../../core/api.js';

export default class ShipGroup {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.frame = data.frame;
        this.quantity = data.quantity;
    }
};