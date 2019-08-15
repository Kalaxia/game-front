import Repository from '~/api/repository';
import Building from '~/model/building';
import BuildingCompartment from '~/model/building_compartment';

export default class BuildingRepository extends Repository {
    async create(planet, building) {
        return new Building(await this.call('POST', `/api/planets/${planet.id}/buildings`, {
            name: building.name
        }));
    }

    async createCompartment(planet, building, compartment) {
        return new BuildingCompartment(await this.call('POST', `/api/planets/${planet.id}/buildings/${building.id}/compartments`, {
            name: compartment.name
        }), building);
    }

    cancel(planet, building) {
        return this.call('DELETE', `/api/planets/${planet.id}/buildings/${building.id}`);
    }
};