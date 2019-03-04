import Repository from '~/api/repository';
import Player from '~/model/player';

export default class PlayerRepository extends Repository {
    async createPlayer(factionId, planetId) {
        await this.call('POST', `/api/players`, {
            faction_id: factionId,
            planet_id: planetId
        });
    }

    async getPlayer(id) {
        return new Player(await this.call('GET', `/api/players/${id}`));
    }

    async getCurrentPlayer() {
        return new Player(await this.call('GET', '/api/me'));
    }
};