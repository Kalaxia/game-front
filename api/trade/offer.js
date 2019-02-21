import Repository from '~/api/repository';
import ResourceOffer from '~/model/trade/resource_offer';

export default class OfferRepository extends Repository {
    async create(offer) {
        await this.call('POST', `/api/planets/${offer.location.id}/offers`, {
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
        const payload = this.call('POST', '/api/offers', { operation });

        const offers = new Array();
        for (data of payload.data) {
            offers.push(new ResourceOffer(data));
        }
        return offers;
    }

    async cancel(offer) {
        await this.call('DELETE', `/api/offers/${offer.id}`);
    }
};