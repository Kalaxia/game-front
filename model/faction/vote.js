import Motion from '~/model/faction/motion';
import Player from '~/model/player';

export default class Vote {
    constructor(data) {
        this.id = data.id;
        this.motion = (data.motion) ? new Motion(data.motion) : null;
        this.author = (data.player) ? new Player(data.player) : null;
        this.createdAt = new Date(data.created_at);
    }
}