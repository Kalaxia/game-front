import ShipModel from './model.js';

export default class Ship {
    constructor(data) {
        this.model = new ShipModel(data.model);
        this.hangar = data.hangar;
        this.id = data.id;
    }
};