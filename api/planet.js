import ShipGroup from '~/model/ship/group';
import Planet from '~/model/planet';
import Repository from '~/api/repository';

class PlanetRepository extends Repository
{
    async getPlanet(id) {
        const payload = await this.call('GET', `/api/planets/${id}`);

        return new Planet(payload.data);
    };

    async getPlayerPlanets(playerId) {
        const payload = await this.call('GET', `/api/players/${playerId}/planets`);

        const planets = [];
        for (const data of payload.data) {
            planets.push(new Planet(data));
        }
        return planets;
    }

    async fetchHangarShips(planet) {
        const payload = await this.call('GET', `/api/planets/${planet.id}/ships/groups`);
        
        planet.shipGroups = new Array();
        for (const groupData of payload.data) {
            planet.shipGroups.push(new ShipGroup(groupData));
        }
    }

    async getFactionPlanetChoices(faction) {
        const payload = await this.call('GET', `/api/factions/${faction.id}/planet-choices`);

        const planets = new Array();
        for (const planetData of payload.data) {
            planets.push(new Planet(planetData));
        }
        return planets;
    }
};

export default PlanetRepository;