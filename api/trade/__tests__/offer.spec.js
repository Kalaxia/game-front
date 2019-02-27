import OfferRepository from "~/api/trade/offer";
import Repository from "~/api/repository";
import ResourceOffer from '~/model/trade/resource_offer';
import { OPERATION_SELL } from "~/model/trade/offer";

const store = {
    state: {
        api: {
            headers: {}
        }
    }
};

describe('Offer Repository', () => {
    const repository = new OfferRepository(store);

    beforeEach(() => {
        fetch.resetMocks();
    })

    it('is a repository', () => {
        expect(repository instanceof Repository).toBe(true);
    });

    it('can create an offer', async () => {
        const offer = new ResourceOffer(null, OPERATION_SELL, { system: { id: 1, coord_x: 64, coord_y: 32 }});
        fetch.once(JSON.stringify(Object.assign({}, offer, { id: 1 })), 201);

        const data = await repository.create(offer);

        expect(data.id).toBe(1);
    });

    if('can get offers', async () => {
        fetch.once(JSON.stringify([
            { id: 1, operation: OPERATION_SELL, planet: {}, quantity: 3000 },
            { id: 2, operation: OPERATION_SELL, planet: {}, quantity: 1500 },
        ]));

        const data = await repository.getAll();

        expect(data.length).toBe(2);
        expect(data[0] instanceof ResourceOffer).toBe(true);
        expect(data[1].id).toBe(2);
    });

    it('can cancel an offer', async () => {
        fetch.once(JSON.stringify({id: 1}), { status: 204 });

        await repository.cancel({ id : 1 });

        expect(fetch.mock.calls.length).toEqual(1);
    });

    it ("can't cancel an unexisting offer", async () => {
        fetch.once(JSON.stringify({ error: 'not found' }), 404);

        repository.cancel({ id: 10 }).catch(e => {
            expect(e).toEqual({
                error: 'not found'
            })
        })
    })
});