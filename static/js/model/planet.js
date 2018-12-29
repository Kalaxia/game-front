import Api from '../core/api.js';
import Ship from './ship/ship.js';
import ShipGroup from './ship/group.js';
import System from './system.js';

class Planet {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.player = data.player;
        this.system = (data.system !== null) ? new System(data.system) : null;
        this.population = data.population;
        this.buildings = data.buildings;
        this.nb_buildings = data.nb_buildings;
        this.available_buildings = data.available_buildings;
        this.settings = data.settings;
        this.relations = data.relations;
        this.resources = data.resources;
        this.storage = data.storage;
        this.ships = new Array();
        this.shipGroups = new Array();
    }

    static fetch(id) {
        return fetch(`/api/planets/${id}`, {
            method: 'GET',
            headers: Api.headers
        })
        .then(Api.responseMiddleware)
        .then(data => {
            return new Planet(data);
        })
        .catch(error => console.log(error));
    }

    static fetchFactionChoicesPlanets(factionId) {
        return fetch(`/api/factions/${factionId}/planet-choices`, {
              method: 'GET',
              headers: Api.headers
          })
          .then(Api.responseMiddleware)
          .then(data => {
              const planets = new Array();
              for (const planetData of data) {
                  planets.push(new Planet(planetData));
              }
              return planets;
          }).catch(error => console.log(error));
    }

    static fetchPlayerPlanets(player) {
        return fetch(`/api/players/${player.id}/planets`, {
          method: 'GET',
          headers: Api.headers
        }).then(Api.responseMiddleware)
          .then(data => {
              const planets = new Array();
              for (const planetData of data) {
                  planets.push(new Planet(planetData));
              }
              return planets;
          })
        ;
    }

    fetchShips() {
        return fetch(`/api/planets/${this.id}/ships`, {
            method: 'GET',
            headers: Api.headers
        })
        .then(Api.responseMiddleware)
        .then(data => {
            this.ships = new Array();
            for (const shipData of data) {
                this.ships.push(new Ship(shipData));
            }
        });
    };

    fetchShipGroups() {
        return fetch(`/api/planets/${this.id}/ships/groups`, {
            method: 'GET',
            headers: Api.headers
        })
        .then(Api.responseMiddleware)
        .then(data => {
            this.shipGroups = new Array();
            for (const groupData of data) {
                this.shipGroups.push(new ShipGroup(groupData));
            }
        });
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

    updateSettings() {
        return fetch(`/api/planets/${this.id}/settings`, {
            method: 'PUT',
            body: JSON.stringify(this.settings),
            headers: Api.headers
        }).then(Api.responseMiddleware);
    }
}

export default Planet;
