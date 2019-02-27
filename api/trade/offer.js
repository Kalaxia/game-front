import Repository from '~/api/repository';
import ResourceOffer from '~/model/trade/resource_offer';

export default class OfferRepository extends Repository {
    create(offer) {
        return this.call('POST', `/api/planets/${offer.location.id}/offers`, {
            operation: offer.operation,
            good_type: offer.goodType,
            planet: offer.location,
            quantity: offer.quantity,
            lot_quantity: offer.lotQuantity,
            price: offer.price,
            resource: offer.resource,
        });
    }

    async getAll(operation) {
        const data = await this.call('POST', '/api/offers', { operation });

        const offers = new Array();
        for (offer of data) {
            offers.push(new ResourceOffer(offer));
        }
        return offers;
    }

    async cancel(offer) {
        await this.call('DELETE', `/api/offers/${offer.id}`);
    }
};