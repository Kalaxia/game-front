import FactionRepository from '~/api/faction';
import FleetRepository from '~/api/fleet';
import MapRepository from '~/api/map';
import PlanetRepository from '~/api/planet';
import PlayerRepository from '~/api/player';
import ShipRepository from '~/api/ship/ship';
import ShipModelRepository from '~/api/ship/model';
import OfferRepository from '~/api/trade/offer';

export default ({ store }, inject) => {
    inject('repositories', {
        faction: new FactionRepository(store),
        fleet: new FleetRepository(store),
        map: new MapRepository(store),
        planet: new PlanetRepository(store),
        player: new PlayerRepository(store),
        ship: {
            model: new ShipModelRepository(store),
            ship: new ShipRepository(store)
        },
        trade: {
            offer: new OfferRepository(store),
        },
    });
};