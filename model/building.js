import BuildingCompartment from '~/model/building_compartment';

export default class Building {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.planet = data.planet;
        this.status = data.status;
        this.constructionState = data.construction_state;
        this.compartments = [];
        this.resources = data.resources;
        this.createdAt = new Date(data.created_at);
        this.updatedAt = (data.updated_at) ? new Date(data.updated_at) : null;
        if (data.compartments) {
            for (const c of data.compartments) {
                this.compartments.push(new BuildingCompartment(c, { name: this.name }));
            }
        }
    }
};
