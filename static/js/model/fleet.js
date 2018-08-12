import Api from '../core/api.js';
import Ship from './ship/ship.js';

class Fleet {
    constructor(data) {
        this.id = data.id;
        this.player = data.player;
        this.location = data.location;
        this.journey = data.journey;
    };
    
    /*************************/
    // Fetch
    
    static fetch(id) {
        return fetch(`/api/fleets/${id}`, { 
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
        return fetch(`/api/players/${playerId}/fleets`, {
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
            body: JSON.stringify({"planet_id": `${planetId}`}),
            headers: Api.headers
        }).then(Api.responseMiddleware)
        .then(fleet => { return fleet; })
    };
    /*------------*/
    // Fetch ships 
    
    static fetchShips(fleetId) {
        /*
         * Fetch all the ships on a fleet 
         */
        return fetch(`/api/fleets/${fleetId}/ships`, { 
          method: 'GET',
          headers: Api.headers
        }).then(Api.responseMiddleware)
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
    
    /************************/
    // Create 
    
    static createNewFleet(planetId) {
        return fetch(`/api/fleets`, {
            method: 'POST',
            body: JSON.stringify({"planet_id":planetId}),
            headers: Api.headers
        }).then(Api.responseMiddleware)
        .then(fleet => { return fleet; })
    };
    
    
    /************************/
    // Transfer 
    
    static transferShipsToHangar (shipsId){
        var requestBody = JSON.stringify( {"data-ships" : shipsId});
        return fetch(`/api/fleets/ships`, {
            method: 'DELETE',
            body: requestBody,
            headers: Api.headers
        }).then(Api.responseMiddleware)
        .then( ()=> { return; }) // the API does not return anything
    }
    
    static transferShipsToFleet (shipsId,fleetId){
        var requestBody = JSON.stringify( {"data-ships" : shipsId});
        return fetch(`/api/fleets/${fleetId}/ships`, {
            method: 'PATCH',
            body: requestBody,
            headers: Api.headers
        }).then(Api.responseMiddleware)
        .then( ()=> { return; }) // the API does not return anything
    }
}

export default Fleet;
