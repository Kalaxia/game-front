import Api from '../core/api.js';

class Fleet {
    constructor(data) {
        this.id = data.id;
        this.player = data.player;
        this.location = data.location;
        this.journey = data.journey;
    }

    static fetch(id) {
        return fetch(`/api/fleet/${id}`, { //TODO in API
            method: 'GET',
            headers: Api.headers
        })
        .then(Api.responseMiddleware)
        .then(data => {
            return new Fleet(data);
        })
        .catch(error => console.log(error));
    }

    
    /*
    static fetchPlayerFleets(playerId) {
        return fetch(`/api/players/${playerId}/fleets`, { //TODO in API
          method: 'GET',
          headers: Api.headers
        }).then(Api.responseMiddleware)
          .then(data => {
              const fleets = new Array();
              for (const fleetData of data) {
                  fleets.push(new Fleet(fleetData));
              }
              return fleets;
          })
        ;
    }
    */
    
    static fetchFleets() {
        return fetch(`/api/fleets`, { //TODO in API
          method: 'GET',
          headers: Api.headers
        }).then(Api.responseMiddleware)
          .then(data => {
              const fleets = new Array();
              for (const fleetData of data) {
                  fleets.push(new Fleet(fleetData));
              }
              return fleets;
          })
        ;
    }
    
    static fetchFleetsOnPlanet(planetId) {
        return fetch(`/api/planets/${planetId}/fleets`, { //TODO in API
          method: 'GET',
          headers: Api.headers
        }).then(Api.responseMiddleware)
          .then(data => {
              const fleets = new Array();
              for (const fleetData of data) {
                  fleets.push(new Fleet(fleetData));
              }
              return fleets;
          })
        ;
    }

    
}

export default Fleet;
