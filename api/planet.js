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

    async getHangarGroups(planet) {
        const data = await this.call('GET', `/api/planets/${planet.id}/ships`);
        
        const shipGroups = new Array();
        for (const groupData of data) {
            shipGroups.push(new ShipGroup(groupData));
        }
        return shipGroups
    }

    async getFactionPlanetChoices(faction) {
        const data = await this.call('GET', `/api/factions/${faction.id}/planet-choices`);

        const planets = new Array();
        for (const planetData of data) {
            planets.push(new Planet(planetData));
        }
        return planets;
    }

    setCurrentPlanet(planet_id) {
        return this.call('PATCH', `/api/me/current-planet`, {
            planet_id
        })
    }

    updateSettings(planet) {
        return this.call('PUT', `/api/planets/${planet.id}/settings`, planet.settings);
    }

    updateTaxRate(planet) {
        return this.call('PATCH', `/api/planets/${planet.id}/tax-rate`, { tax_rate: planet.taxRate });
    }
};