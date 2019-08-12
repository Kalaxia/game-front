export default class Building {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.planet = data.planet;
        this.status = data.status;
        this.construction_state = data.construction_state;
        this.compartments = data.compartments;
        this.resources = data.resources;
    }
};
