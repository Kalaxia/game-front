import Repository from '~/api/repository';
import ResourceOffer from '~/model/trade/resource_offer';

export default class OfferRepository extends Repository {
    create(operation, good_type, planet, quantity, lot_quantity, price, resource) {
        return this.call('POST', `/api/planets/${planet.id}/offers`, {
            operation,
            good_type,
            planet,
            quantity,
            lot_quantity,
            price,
            resource,
        });
    }

    accept(offer, nbLots, planetId) {
        return this.call('POST', `/api/offers/${offer.id}/accept`, {
            nb_lots: nbLots,
            planet_id: planetId
        });
    }

    async getAll(operation) {
        const data = await this.call('POST', '/api/offers/search', { operation });

        const offers = new Array();
        for (const offer of data) {
            offers.push(new ResourceOffer(offer));
        }
        return offers;
    }

    async cancel(offer) {
        await this.call('DELETE', `/api/offers/${offer.id}`);
    }
};