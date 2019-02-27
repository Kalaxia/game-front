import Repository from '~/api/repository';
import Player from '~/model/player';

export default class PlayerRepository extends Repository {
    async createPlayer() {
        await this.call('POST', `/api/players`, {
            faction_id: store.state.user.player.faction.id,
            planet_id: store.state.user.planets[0].id
        });
    }

    async getPlayer(id) {
        return new Player(await this.call('GET', `/api/players/${id}`));
    }

    async getCurrentPlayer() {
        return new Player(await this.call('GET', '/api/me'));
    }
};