import Map from '~/model/map';
import System from '~/model/system';
import Repository from '~/api/repository';

export default class MapRepository extends Repository {
    async getMap() {
        return new Map(await this.call('GET', '/api/map'));
    }

    async getSystem(id) {
        return new System(await this.call('GET', `/api/systems/${id}`));
    }

    getSectorSystems(sector) {
        return this.call('GET', `/api/systems?sector=${sector}`);
    }
};