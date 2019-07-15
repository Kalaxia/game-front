class ShipFrame {
    constructor(data) {
        this.slug = data.slug;
        this.picture = data.picture;
        this.slots = data.slots;
        this.stats = data.stats;
        this.price = data.price;
    }
}

export default ShipFrame;
