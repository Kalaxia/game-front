class ShipSlot {
    constructor(data) {
        this.position = data.position;
        this.top = data.top;
        this.left = data.left;
        this.bottom = data.bottom;
        this.right = data.right;
        this.size = data.size;
        this.shape = data.shape;
        this.module = (typeof data.module !== 'undefined') ? data.module : null;
    }

    static formatArray(data) {
        const slots = new Array();
        for (const slotData of data) {
            slots.push(new ShipSlot(slotData));
        }
        return slots;
    }
}

export default ShipSlot;
