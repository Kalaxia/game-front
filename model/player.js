import Faction from '~/model/faction';
import Planet from '~/model/planet';

export default class Player {
    constructor(data) {
        this.id = data.id;
        this.pseudo = data.pseudo;
        this.avatar = data.avatar;
        this.gender = data.gender;
        this.isActive = data.is_active;
        this.wallet = data.wallet;
        this.faction = (data.faction !== null) ? new Faction(data.faction) : null;
        this.currentPlanet = (data.current_planet !== null) ? new Planet(data.current_planet) : null;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    toJSON() {
        return Object.assign({}, this);
    }
}
