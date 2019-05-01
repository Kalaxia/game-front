import Faction from '~/model/faction';
import Planet from '~/model/planet';

export default class Player {
    constructor(data) {
        this.id = data.id;
        this.pseudo = data.pseudo;
        this.avatar = data.avatar;
        this.gender = data.gender;
        this.isActive = data.is_active;
        this.wallet = data.wallet;
        this.faction = (data.faction !== null) ? new Faction(data.faction) : null;
        this.currentPlanet = (data.current_planet !== null) ? new Planet(data.current_planet) : null;
        this.notifications = (data.notifications !== null) ? this.formatNotifications(data.notifications) : {};
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    formatNotifications(data) {
        const notifications = {};
        for (const notification of data) {
            if (typeof notifications[notification.type] === 'undefined') {
                notifications[notification.type] = [];
            }
            notifications[notification.type].push(notification);
        }
        return notifications;
    }

    toJSON() {
        return Object.assign({}, this);
    }
}
