import Repository from '~/api/repository';
import Combat from '~/model/fleet/combat';

export default class CombatRepository extends Repository
{
    async get(id) {
        return new Combat(await this.call('GET', `/api/combats/${id}`));
    }

    async getAll() {
        const combats = await this.call('GET', '/api/combats');
        const results = [];

        for (const data of combats) {
            results.push(new Combat(data));
        }
        return results;
    }
}