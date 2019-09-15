export default class ResourceProduction {
    constructor(data) {
        this.name = data.name;
        this.density = data.density;
        this.baseQuantity = data.base_quantity;
        this.finalQuantity = data.final_quantity;
        this.percent = data.percent;
    }
}