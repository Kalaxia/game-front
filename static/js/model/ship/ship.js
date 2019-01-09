import ShipModel from './model.js';

export default class Ship {
    constructor(data) {
        this.model = new ShipModel(data.model);
        this.hangar = data.hangar;
        this.id = data.id;
    }

    create(quantity) {
        return fetch(`/api/planets/${this.hangar.id}/ships`, {
            method: 'POST',
            body: JSON.stringify({
                model: this.model,
                quantity: parseInt(quantity)
            })
        });
    }

    static fetchConstructingShips(planetId) {
        return fetch(`/api/planets/${planetId}/ships/constructing`, {
            method: 'GET',
        })
        .then(data => {
            const ships = new Array();
            if (data == undefined || data == null) {
               return ships;
            }
            for (const shipData of data) {
                ships.push(new ships(shipData));
            }
            return ships;
        });
    }

    static fetchHangarShips(planetId) {
        return fetch(`/api/planets/${planetId}/ships`, {
            method: 'GET'
        })
        .then(data => {
            const ships = new Array();
            if (data == undefined || data == null) {
               return ships;
            }
            for (const shipData of data) {
                ships.push(new ships(shipData));
            }
            return ships;
        });
    }
};