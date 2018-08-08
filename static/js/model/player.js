import Api from '../core/api.js';
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

    static fetchCurrentPlayer() {
        if (currentPlayer !== null) {
            return new Promise((resolve, reject) => {
                resolve(currentPlayer);
            });
        }
        return fetch('/api/me', {
            method: 'GET',
            headers: Api.headers
        }).then(Api.responseMiddleware)
        .then(data => {
            const player = new Player(data);
            currentPlayer = player;
            return player;
        }).catch(error => console.log(error));
    }

    static fetchPlayer(id) {
        return fetch(`/api/players/${id}`, {
            method: 'GET',
            headers: Api.headers
        }).then(Api.responseMiddleware)
        .then(data => {
            return new Player(data);
        });
    }

    static logout() {
        localStorage.removeItem('security.jwt');
        localStorage.removeItem('current_planet');
        window.location = `${config.portalUrl}/dashboard`;
    }
}
