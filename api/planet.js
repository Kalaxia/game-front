import ShipGroup from '~/model/ship/group';
import Planet from '~/model/planet';
import Repository from '~/api/repository';

export default class PlanetRepository extends Repository
{
    async get(id) {
        return new Planet(await this.call('GET', `/api/planets/${id}`));
    };

    async getPlayerPlanets(playerId) {
        const data = await this.call('GET', `/api/players/${playerId}/planets`);

        const planets = [];
        for (const planet of data) {
            planets.push(new Planet(planet));
        }
        return planets;
    }

    async getHangarShipGroups(planet) {
        const data = await this.call('GET', `/api/planets/${planet.id}/ships/groups`);
        
        planet.shipGroups = new Array();
        for (const groupData of data) {
            planet.shipGroups.push(new ShipGroup(groupData));
        }
    }

    async getFactionPlanetChoices(faction) {
        const data = await this.call('GET', `/api/factions/${faction.id}/planet-choices`);

        const planets = new Array();
        for (const planetData of data) {
            planets.push(new Planet(planetData));
        }
        return planets;
    }

    updateSettings(planet) {
        return this.call('PUT', `/api/planets/${planet.id}/settings`, planet.settings);
    }
};