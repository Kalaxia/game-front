import Repository from '~/api/repository';
import Player from '~/model/player';

export default class PlayerRepository extends Repository {
    async createPlayer(player, planetId) {
        await this.call('POST', `/api/players`, {
            class: player.class,
            gender: player.gender,
            avatar: player.avatar,
            pseudo: player.pseudo,
            faction_id: player.faction.id,
            planet_id: planetId
        });
    }

    async getPlayer(id) {
        return new Player(await this.call('GET', `/api/players/${id}`));
    }

    async getCurrentPlayer() {
        return new Player(await this.call('GET', '/api/me'));
    }

    deleteNotification(notification) {
        return this.call('DELETE', `/api/me/notifications/${notification.id}`);
    }
};