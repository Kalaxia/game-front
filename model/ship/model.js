class ShipModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.frame = data.frame;
        this.type = data.type;
        this.slots = data.slots;
        this.stats = data.stats;
        this.price = data.price;
        this.module = data.module;
    }

    format() {
        const slots = new Array();
        for (const slotPosition in this.slots) {
            const slot = this.slots[slotPosition];
            slot.module = (slot.module) ? slot.module.slug : null;
            slots.push(slot);
        }
        return {
            name: this.name,
            frame: this.frame.slug,
            slots: slots
        };
    }
}

export default ShipModel;
