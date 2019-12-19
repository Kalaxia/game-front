import Planet from '~/model/planet';

export default class Place {
    constructor(data) {
        this.planet = (data.planet) ? (data.planet instanceof Planet) ? data.planet : new Planet(data.planet) : null;
        this.coordinates = data.coordinates;
    }
}