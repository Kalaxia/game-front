import Faction from '~/model/faction';
import Motion from '~/model/faction/motion';
import Vote from '~/model/faction/vote';
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

        const members = new Array();
        for (const member of data) {
            members.push(new Player(member));
        }
        return members;
    }

    async createMotion(faction, type, data) {
        const motion = await this.call('POST', `/api/factions/${faction.id}/motions`, {
            type,
            data
        });
        return new Motion(motion);
    }

    async getPreviousMotions(factionId) {
        const data = await this.call('GET', `/api/factions/${factionId}/motions/previous`);

        const motions = new Array();
        for (const motion of data) {
            motions.push(new Motion(motion));
        }
        return motions;
    }

    async getFactionMotions(factionId) {
        const data = await this.call('GET', `/api/factions/${factionId}/motions`);

        const motions = new Array();
        for (const motion of data) {
            motions.push(new Motion(motion));
        }
        return motions;
    }

    async getMotion(factionId, motionId) {
        return new Motion(await this.call('GET', `/api/factions/${factionId}/motions/${motionId}`));
    }

    async getVote(factionId, motionId) {
        return new Vote(await this.call('GET', `/api/factions/${factionId}/motions/${motionId}/votes/me`));
    }

    getVotes(factionId, motionId) {
        return this.call('GET', `/api/factions/${factionId}/motions/${motionId}/votes`);
    }

    async vote(factionId, motionId, option) {
        return new Vote(await this.call('POST', `/api/factions/${factionId}/motions/${motionId}/votes`, { option }));
    }
};