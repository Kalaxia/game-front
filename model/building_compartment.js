export default class BuildingCompartment
{
    constructor(data, building) {
        this.id = data.id;
        this.name = data.name;
        this.picture = data.picture;
        this.building = building;
        this.bonuses = data.bonuses;
        this.maluses = data.maluses;
    }
}