import Repository from '~/api/repository';
import Building from '~/model/building';

export default class BuildingRepository extends Repository {
    async create(planet, building) {
        return new Building(await this.call('POST', `/api/planets/${planet.id}/buildings`, {
            name: building.name
        }));
    }

    cancel(planet, building) {
        return this.call('DELETE', `/api/planets/${planet.id}/buildings/${building.id}`);
    }
};