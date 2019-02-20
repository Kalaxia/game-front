import FactionRepository from '~/api/faction';
import FleetRepository from '~/api/fleet';
import MapRepository from '~/api/map';
import PlanetRepository from '~/api/planet';
import PlayerRepository from '~/api/player';
import ShipRepository from '~/api/ship';

export default ({ store }, inject) => {
    inject('repositories', {
        faction: new FactionRepository(store),
        fleet: new FleetRepository(store),
        map: new MapRepository(store),
        planet: new PlanetRepository(store),
        player: new PlayerRepository(store),
        ship: new ShipRepository(store)
    });
};