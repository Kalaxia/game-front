import Faction from '~/model/faction';
import Player from '~/model/player';
import Repository from '~/api/repository';

class FactionRepository extends Repository
{
    async getFaction(id) {
        const payload = await this.call('GET', `/api/factions/${id}`);

        return new Faction(payload.data);
    }

    async getFactions() {
        const payload = await this.call('GET', `/api/factions`);

        const factions = new Array();
        for (const factionData of payload.data) {
            factions.push(new Faction(factionData));
        }
        return factions;
    }

    async getFactionMembers(faction) {
        const payload = await this.call('GET', `/api/factions/${faction.id}/members`);

        faction.members = new Array();
        for (const member of payload.data) {
            faction.members.push(new Player(member));
        }
    }
};

export default FactionRepository;