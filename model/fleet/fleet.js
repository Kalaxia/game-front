import Player from '~/model/player.js';
import Place from '~/model/map/place.js';
import Journey from '~/model/fleet/journey.js';

export default class Fleet {
    constructor(data) {
        this.id = data.id;
        this.player = (data.player) ? new Player(data.player) : null;
        this.place = (data.place) ? new Place(data.place) : null;
        this.journey = (data.journey !== null) ? new Journey(data.journey) : null;
        this.shipSummary = (data.ship_summary) ? data.ship_summary : [];
        this.ships = new Array();
        this.shipGroups = new Array();
        this.squadrons = new Array();
        this.range = null;
        this.cargo = data.cargo ? data.cargo : {};
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