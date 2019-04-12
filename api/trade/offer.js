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

    async getAll(operation) {
        const data = await this.call('POST', '/api/offers', { operation });

        const offers = new Array();
        for (const offer of data) {
            offers.push(new ResourceOffer(
                offer.id,
                offer.operation,
                offer.location,
                offer.created_at,
                offer.accepted_at,
                offer.quantity,
                offer.lot_quantity,
                offer.price,
                offer.resource
            ));
        }
        return offers;
    }

    async cancel(offer) {
        await this.call('DELETE', `/api/offers/${offer.id}`);
    }
};