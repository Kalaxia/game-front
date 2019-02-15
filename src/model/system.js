import Planet from "./planet";

class System {
    constructor(data) {
        this.id = data.id;
        this.x = data.coord_x;
        this.y = data.coord_y;
        if (data.planets === null) {
            return;
        }
        this.planets = new Array();
        for (const planetData of data.planets) {
            this.planets.push(new Planet(planetData));
        }
    }

    getDistanceFrom(system) {
        return Math.sqrt(Math.pow(system.x - this.x, 2) + Math.pow(system.y - this.y, 2));
    }
}

export default System;
