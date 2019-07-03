import Faction from '~/model/faction';
import Motion from '~/model/faction/motion';
import Player from '~/model/player';
import Repository from '~/api/repository';

export default class FactionRepository extends Repository
{
    async getFaction(id) {
        return new Faction(await this.call('GET', `/api/factions/${id}`));
    }

    async getFactions() {
        const data = await this.call('GET', `/api/factions`);

        const factions = new Array();
        for (const factionData of data) {
            factions.push(new Faction(factionData));
        }
        return factions;
    }

    async getFactionMembers(faction) {
        const data = await this.call('GET', `/api/factions/${faction.id}/members`);

        faction.members = new Array();
        for (const member of data) {
            faction.members.push(new Player(member));
        }
    }

    async createMotion(faction, type, data) {
        const motion = await this.call('POST', `/api/factions/${faction.id}/motions`, {
            type,
            data
        });
        return new Motion(motion);
    }

    async getFactionMotions(factionId) {
        const data = await this.call('GET', `/api/factions/${factionId}/motions`);

        const motions = new Array();
        for (const motion of data) {
            motions.push(new Motion(motion));
        }
        return motions;
    }
};