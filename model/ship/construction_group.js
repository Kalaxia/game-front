import ShipModel from '~/model/ship/model';

export default class ShipConstructionGroup {
    constructor(data) {
        this.model = new ShipModel(data.model);
        this.constructionState = data.construction_state;
        this.quantity = data.quantity;
    }
};