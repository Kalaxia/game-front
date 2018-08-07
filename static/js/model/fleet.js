import Api from '../core/api.js';

class Fleet {
    constructor(data) {
        this.id = data.id;
        this.player = data.player;
        this.location = data.location;
        this.journey = data.journey;
    };

    static fetch(id) {
        return fetch(`/api/fleet/${id}`, { 
            method: 'GET',
            headers: Api.headers
        })
        .then(Api.responseMiddleware)
        .then(data => {
            return new Fleet(data);
        })
        .catch(error => console.log(error));
    };

    
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
    };
    */
    
    static fetchPlayerFleets() {
        /*
         * Fetch all the fleets of a player
         */
        return fetch(`/api/fleets`, { 
          method: 'GET',
          headers: Api.headers
        }).then(Api.responseMiddleware)
          .then(data => {
                const fleets = new Array();
                if (data == undefined || data == null) {
                    return fleets;
                }
                for (const fleetData of data) {
                    fleets.push(new Fleet(fleetData));
                }
                return fleets;
          })
        ;
    };
    
    static fetchPlanetFleets(planetId) {
        /*
         * Fetch all the fleet on a planet ( that the player own : see API )
         */
        return fetch(`/api/planets/${planetId}/fleets`, { 
          method: 'GET',
          headers: Api.headers
        }).then(Api.responseMiddleware)
          .then(data => {
                const fleets = new Array();
                if (data == undefined || data == null) {
                    return fleets;
                }
                for (const fleetData of data) {
                    fleets.push(new Fleet(fleetData));
                }
                return fleets;
          })
        ;
    };

    static createNewFleet(planetId) {
        return fetch(`/api/fleets`, {
            method: 'POST',
            body: JSON.stringify({"planet_id":planetId}),
            headers: Api.headers
        }).then(Api.responseMiddleware)
        .then(fleet => { return fleet; })
    };
}

export default Fleet;
