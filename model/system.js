import Planet from "./planet";
import Faction from "./faction";

class System {
    constructor(data) {
        this.id = data.id;
        this.x = data.coord_x;
        this.y = data.coord_y;
        this.faction = (data.faction) ? new Faction(data.faction) : null;
        if (!data.planets) {
            return;
        }
        this.planets = new Array();
        for (const planetData of data.planets) {
            const planet = new Planet(planetData);
            planet.system = {
                id: this.id,
                x: this.x,
                y: this.y
            };
            this.planets.push(planet);
        }
    }

    getDistanceFrom(system) {
        return Math.sqrt(Math.pow(system.x - this.x, 2) + Math.pow(system.y - this.y, 2));
    }
}

export default System;
