import Repository from '~/api/repository';

export default class CombatRepository extends Repository
{
    get(id) {
        return this.call('GET', `/api/combats/${id}`);
    }

    getAll() {
        return this.call('GET', '/api/combats');
    }
}