import Planet from '~/model/planet';

export const ORDER_PASS = 'pass';
export const ORDER_CONQUER = 'conquer';

export default class JourneyStep {
    constructor(data) {
        this.id = data.id;
        this.startLocation = (data.planet_start !== null) ? new Planet(data.planet_start) : null;
        this.startX = data.map_pos_x_start;
        this.startY = data.map_pos_y_start;
        this.endLocation = (data.planet_final !== null) ? new Planet(data.planet_final) : null;
        this.endX = data.map_pos_x_final;
        this.endY = data.map_pos_y_final;
        this.startedAt = new Date(data.time_start);
        this.arrivesAt = new Date(data.time_arrival);
        this.restTime = data.time_jump;
        this.number = data.step_number;
        this.order = data.order;
    }
}