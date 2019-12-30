import CombatRepository from '~/api/ship/combat';
import FactionRepository from '~/api/faction';
import FleetRepository from '~/api/fleet';
import MapRepository from '~/api/map';
import PlanetRepository from '~/api/planet';
import PlayerRepository from '~/api/player';
import ShipRepository from '~/api/ship/ship';
import ShipModelRepository from '~/api/ship/model';
import OfferRepository from '~/api/trade/offer';
import Repository from '~/api/repository';
import BuildingRepository from '~/api/building';
import FactionWarRepository from '~/api/faction/war';

export default ({ store }, inject) => {
    inject('repositories', {
        building: new BuildingRepository(store),
        faction: {
            faction: new FactionRepository(store),
            war: new FactionWarRepository(store),
        },
        fleet: new FleetRepository(store),
        map: new MapRepository(store),
        planet: new PlanetRepository(store),
        player: new PlayerRepository(store),
        ship: {
            combat: new CombatRepository(store),
            model: new ShipModelRepository(store),
            ship: new ShipRepository(store)
        },
        trade: {
            offer: new OfferRepository(store),
        },
        repository: new Repository(store)
    });
};