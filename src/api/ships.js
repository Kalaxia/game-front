import ShipModel from '../model/ship/model';
import store from '../store';

export const getPlayerShipModels = async () => {
    const response = await fetch(`/api/me/ship-models`, {
        method: 'GET',
        headers: store.state.api.headers
    });
    const payload = { response, data: {}};
    await store.dispatch('api/responseMiddleware', payload);

    const models = new Array();
    for (const modelData of payload.data) {
        models.push(new ShipModel(modelData));
    }
    return models;
};