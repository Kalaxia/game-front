import Map from '~/model/map';
import System from '~/model/system';
import Repository from '~/api/repository';

export default class MapRepository extends Repository {
    async getMap() {
        const payload = await this.call('GET', '/api/map');

        return new Map(payload.data);
    }

    async getSystem(id) {
        const payload = await this.call('GET', `/api/systems/${id}`);

        return new System(payload.data);
    }
};