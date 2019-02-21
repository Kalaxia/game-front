import Faction from './faction.js';

let currentPlayer = null;

export default class Player {
    constructor(data) {
        this.id = data.id;
        this.pseudo = data.pseudo;
        this.isActive = data.is_active;
        this.wallet = data.wallet;
        this.faction = (data.faction !== null) ? new Faction(data.faction) : null;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }
}
