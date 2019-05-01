import Fleet from '~/model/fleet/fleet';

export default class Combat {
    constructor(data) {
        this.id = data.id;
        this.attacker = new Fleet(data.attacker);
        this.defender = new Fleet(data.defender);
        this.attackerShips = data.attacker_ships;
        this.defenderShips = data.defender_ships;
        this.attackerLosses = (data.attacker_losses !== null) ? data.attacker_losses : [];
        this.defenderLosses = (data.defender_losses !== null) ? data.defender_losses : [];
        this.createdAt = new Date(data.created_at);
    }
}