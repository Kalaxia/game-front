import BuildingCompartment from '~/model/building_compartment';

export default class Building {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.planet = data.planet;
        this.status = data.status;
        this.construction_state = data.construction_state;
        this.compartments = [];
        this.resources = data.resources;
        if (data.compartments) {
            for (const c of data.compartments) {
                this.compartments.push(new BuildingCompartment(c, { name: this.name }));
            }
        }
    }
};
