import Player from '../player.js';
import Planet from '../planet.js';
import Journey from './journey.js';

export default class Fleet {
    constructor(data) {
        this.id = data.id;
        this.player = new Player(data.player);
        this.location = (data.location) ? new Planet(data.location) : null;
        this.journey = (data.journey !== null) ? new Journey(data.journey) : null;
        this.shipSummary = (data.ship_summary) ? data.ship_summary : [];
        this.ships = new Array();
        this.shipGroups = new Array();
        this.range = null;
        this.map_pos_x = data.map_pos_x;
        this.map_pos_y = data.map_pos_y;
    };

    updateShipGroups(shipGroup, nbShips) {
        let index = -1;
        for (const sg of this.shipGroups) {
            if (sg.id === shipGroup.id) {
                index = this.shipGroups.indexOf(sg);
                sg.quantity += nbShips;
                break;
            }
        }
        if (index === -1 && nbShips > 0) {
            this.shipGroups.push(Object.assign({}, shipGroup, { quantity: nbShips }));
        } else if (index >= 0 && this.shipGroups[index].quantity === 0) {
            this.shipGroups.splice(index, 1);
        }
    }

    isOnJourney() {
        return this.journey.id !== null;
    }
};