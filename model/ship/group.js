export const maxQuantity = 50;

export default class ShipGroup {
    constructor(data) {
        this.id = data.model.id;
        this.name = data.model.name;
        this.type = data.model.type;
        this.frame = data.model.frame;
        this.stats = data.model.stats;
        this.quantity = data.quantity;
    }
};