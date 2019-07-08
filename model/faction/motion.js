import Player from '~/model/player';
import Faction from '~/model/faction';

export default class Motion {
    constructor(data) {
        this.id = data.id;
        this.type = data.type;
        this.data = data.data;
        this.faction = (data.faction) ? new Faction(data.faction) : null;
        this.author = (data.author) ? new Player(data.author) : null;
        this.isApproved = data.is_approved;
        this.isProcessed = data.is_processed;
        this.createdAt = new Date(data.created_at);
        this.endedAt = new Date(data.ended_at);
    }
};