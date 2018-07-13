import Api from '../core/api.js';

class Map {
    constructor(data) {
        this.systems = data.systems;
    }

    static fetch() {
        return fetch('/api/map', {
            method: 'GET',
            headers: Api.headers
        })
        .then(Api.responseMiddleware)
        .then(data => {
            return new Map(data);
        }).catch(error => console.log(error));

    }
}

export default Map;
