import Fleet from '~/model/fleet/fleet';
import Place from '~/model/map/place';

export default class Combat {
    constructor(data) {
        this.id = data.id;
        this.attacker = (data.attacker) ? new Fleet(data.attacker) : null;
        this.defender = (data.defender) ? new Fleet(data.defender) : null;
        this.place = (data.place) ? new Place(data.place) : null;
        this.isVictory = data.is_victory;
        this.attackerShips = data.attacker_ships;
        this.defenderShips = data.defender_ships;
        this.attackerLosses = (data.attacker_losses !== null) ? data.attacker_losses : [];
        this.defenderLosses = (data.defender_losses !== null) ? data.defender_losses : [];
        this.rounds = data.rounds;
        this.squadrons = new Array();
        this.createdAt = new Date(data.begin_at);
        this.endedAt = data.end_at ? new Date(data.end_at) : null;
    }

    formatNotificationData() {
        return Object.assign({}, this, {
            squadrons: undefined,
            rounds: undefined
        })
    }
}