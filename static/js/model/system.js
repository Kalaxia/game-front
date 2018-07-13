import Api from '../core/api.js';

class System {
    constructor(data) {
        this.id = data.id;
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
}

export default System;
