import framesData from '~/resources/ship_frames';
import Price from '~/model/price.js';
import ShipSlot from './slot.js';

class ShipFrame {
    constructor(data) {
        this.slug = data.slug;
        this.picture = data.picture;
        this.slots = data.slots;
        this.stats = data.stats;
        this.price = data.price;
    }

    static createFromSlug(slug) {
        const frame = new ShipFrame(framesData[slug]);
        //frame.name = ships.frames[slug];
        frame.slug = slug;
        frame.slots = ShipSlot.formatArray(frame.slots);
        frame.price = Price.format(frame.price);
        frame.initSlots();
        return frame;
    }

    static getFrames() {
        const frames = new Array();
        for (const frameSlug in framesData) {
            frames.push(ShipFrame.createFromSlug(frameSlug));
        }
        return frames;
    }

    initSlots() {
        const slots = {};
        for (const slot of this.slots) {
            slots[slot.position] = slot;
        }
        this.slots = slots;
    }
}

export default ShipFrame;
