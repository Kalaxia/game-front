import Api from '../core/api.js';
import Ship from './ship/ship.js';

class Planet {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.player = data.player;
        this.system = data.system;
        this.population = data.population;
        this.buildings = data.buildings;
        this.nb_buildings = data.nb_buildings;
        this.available_buildings = data.available_buildings;
        this.settings = data.settings;
        this.relations = data.relations;
        this.resources = data.resources;
        this.storage = data.storage;
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

    static fetchPlayerPlanets(playerId) {
        return fetch(`/api/players/${playerId}/planets`, {
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

    static fetchShips(id) {
        return fetch(`/api/planets/${id}/ships`, { 
            method: 'GET',
            headers: Api.headers
        })
        .then(Api.responseMiddleware)
        .then(data => {
            const ships = new Array();
            if (data == undefined || data == null) {
                return ships;
            }
            for (const shipData of data) {
                ships.push(new Ship(shipData));
            }
            return ships;
        })
        .catch(error => console.log(error));
    };
    
    updateSettings() {
        const self = this;
        return fetch(`/api/planets/${self.id}/settings`, {
            method: 'PUT',
            body: JSON.stringify(self.settings),
            headers: Api.headers
        }).then(Api.responseMiddleware)
        .then(response => { return self; })
    }
    
    
}

export default Planet;
