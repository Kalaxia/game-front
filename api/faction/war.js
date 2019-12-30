import Repository from '~/api/repository';

export default class FactionWarRepository extends Repository {
    getWars(factionId) {
        return this.call('GET', `/api/factions/${factionId}/wars`);
    }

    getWar(factionId, warId) {
        return this.call('GET', `/api/factions/${factionId}/wars/${warId}`);
    }

    getUnansweredCasusBelli(factionId, targetId) {
        return this.call('GET', `/api/factions/${factionId}/casus_belli/unanswered?faction_id=${targetId}`);
    }

    getCasusBelli(factionId, casusBelliId) {
        return this.call('GET', `/api/factions/${factionId}/casus_belli/${casusBelliId}`);
    }
}