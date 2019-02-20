import Repository from '~/api/repository';
import Player from '~/model/player';

class PlayerRepository extends Repository
{
    async createPlayer() {
        const payload = await this.call('POST', `/api/players`, {
            faction_id: store.state.user.player.faction.id,
            planet_id: store.state.user.planets[0].id
        });
    }

    async getCurrentPlayer() {
        const payload = await this.call('GET', '/api/me');

        return new Player(payload.data);
    }
};

export default PlayerRepository;