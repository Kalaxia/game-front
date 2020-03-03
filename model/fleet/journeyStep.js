import Place from '~/model/map/place';

export const ORDER_PASS = 'pass';
export const ORDER_COLONIZE = 'colonize';
export const ORDER_CONQUER = 'conquer';
export const ORDER_DELIVER = 'deliver';

export default class JourneyStep {
    constructor(data) {
        this.id = data.id;
        this.startPlace = (data.start_place !== null) ? (data.start_place instanceof Place) ? data.start_place : new Place(data.start_place) : null;
        this.endPlace = (data.end_place !== null) ? (data.end_place instanceof Place) ? data.end_place : new Place(data.end_place) : null;
        this.startedAt = new Date(data.time_start);
        this.arrivesAt = new Date(data.time_arrival);
        this.restTime = data.time_jump;
        this.number = data.step_number;
        this.order = data.order;
        this.data = data.data;
    }
}