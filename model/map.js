class Map {
    constructor(data) {
        this.systems = {};
        this.size = data.size;

        for (const system of data.systems) {
            this.systems[system.id] = system;
        }
    }
}

export default Map;
