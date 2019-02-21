class Faction {
    constructor(data) {
        this.id = data.id
        this.name = data.name;
        this.description = data.description;
        this.banner = data.banner;
        this.color = data.color;
        this.relations = data.relations;
        this.members = new Array();
    }
}

export default Faction;
