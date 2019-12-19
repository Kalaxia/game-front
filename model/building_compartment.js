export default class BuildingCompartment
{
    constructor(data, building) {
        this.id = data.id;
        this.name = data.name;
        this.status = data.status;
        this.picture = data.picture;
        this.building = building;
        this.constructionState = data.construction_state;
        this.modifiers = data.modifiers;
        this.createdAt = new Date(data.created_at);
        this.updatedAt = (data.updated_at) ? new Date(data.updated_at) : null;
    }
}