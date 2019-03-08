import Repository from '~/api/repository';

export default class BuildingRepository extends Repository {
    create(planet, building) {
        return this.call('POST', `/api/planets/${planet.id}/buildings`, {
            name: building.name
        });
    }
};