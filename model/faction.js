const FACTION_REGIME_DEMOCRACY = 1;

class Faction {
    constructor(data) {
        this.id = data.id
        this.name = data.name;
        this.description = data.description;
        this.banner = data.banner;
        this.colors = data.colors;
        this.wallet = data.wallet;
        this.relations = data.relations;
        this.members = new Array();
        this.settings = {};
        if (data.settings !== null) {
            this.initSettings(data.settings);
        }
    }

    initSettings(settings) {
        for (const s of settings) {
            this.settings[s.name] = s;
        }
    }
}

export default Faction;
