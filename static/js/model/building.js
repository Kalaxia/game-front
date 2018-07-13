import Api from '../core/api.js';

class Building {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.planet = data.planet;
        this.status = data.status;
        this.construction_state = data.construction_state;
    }

    static create(planet, name) {
        return fetch(`/api/planets/${planet.id}/buildings`, {
            method: "POST",
            body: JSON.stringify({
                name: name
            }),
            headers: Api.headers
        }).then(Api.responseMiddleware)
        .then(data => {
            return new Building(data);
        });
    }
}

export default Building;
