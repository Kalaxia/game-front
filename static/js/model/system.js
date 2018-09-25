import Api from '../core/api.js';

class System {
    constructor(data) {
        this.id = data.id;
        this.x = data.coord_x;
        this.y = data.coord_y;
        this.planets = data.planets;
    }

    static fetch(id) {
        return fetch(`/api/systems/${id}`, {
            method: 'GET',
            headers: Api.headers
        })
        .then(Api.responseMiddleware)
        .then(data => {
            return new System(data);
        }).catch(error => console.log(error));
    }
    getDistanceFrom(system) {
        return Math.sqrt(Math.pow(system.x - this.x, 2) + Math.pow(system.y - this.y, 2));
    }
}

export default System;
