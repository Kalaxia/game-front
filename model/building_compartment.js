export default class BuildingCompartment
{
    constructor(data, building) {
        this.id = data.id;
        this.name = data.name;
        this.status = data.status;
        this.picture = data.picture;
        this.building = building;
        this.constructionState = data.construction_state;
        this.bonuses = data.bonuses;
        this.maluses = data.maluses;
        this.createdAt = new Date(data.created_at);
        this.updatedAt = (data.updated_at) ? new Date(data.updated_at) : null;
    }
}