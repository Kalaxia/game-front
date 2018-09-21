import Api from '../core/api.js';
import Ship from './ship/ship.js';
import Player from './player.js';
import Planet from './planet.js';
import Journey from './journey.js';

class Fleet {
    constructor(data) {
        this.id = data.id;
        //this.player = new Player (data.player);
        //this.location = new Planet (data.location);
        //this.journey = new Journey (data.journey);
        this.player =data.player;
        this.location = data.location;
        this.journey = data.journey;
        this.map_pos_x = data.map_pos_x;
        this.map_pos_y = data.map_pos_y;
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
        }).then(Api.responseMiddleware);
        // the API does not return anything
    }
    
    static transferShipsToFleet (shipsId,fleetId){
        var requestBody = JSON.stringify( {"data-ships" : shipsId});
        return fetch(`/api/fleets/${fleetId}/ships`, {
            method: 'PATCH',
            body: requestBody,
            headers: Api.headers
        }).then(Api.responseMiddleware);
        // the API does not return anything
    }
    
    static deleteFromId (id){
        return fetch(`/api/fleets/${id}`, {
            method: 'DELETE',
            body : "",
            headers: Api.headers
        }).then(Api.responseMiddleware); // if the fleet is delete it should return "Deleted" otherwise it does not return anything
    }
    
    fetchRange(){
        return fetch(`/api/fleets/${this.id}/range`, {
            method: 'GET',
            headers: Api.headers
        }).then(Api.responseMiddleware);
    }
    
    static fetchRangeStatic(){
        return fetch(`/api/fleets/range`, {
            method: 'GET',
            headers: Api.headers
        }).then(Api.responseMiddleware);
    }
    
    sendOnJourney(positionArray){
        return Journey.sendOnJourney(this.id, {"steps" :positionArray});
    }
    
}

export default Fleet;
