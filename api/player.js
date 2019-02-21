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
        const payload = await this.call('GET', `/api/players/${id}`);

        return new Player(payload.data);
    }

    async getCurrentPlayer() {
        const payload = await this.call('GET', '/api/me');

        return new Player(payload.data);
    }
};