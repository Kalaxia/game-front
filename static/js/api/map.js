import store from '../store';
import Map from '../model/map';
import System from '../model/system';

export const getMap = async () => {
    const response = await fetch('/api/map', {
        method: 'GET',
        headers: store.state.api.headers
    });
    const payload = { response, data: {}};
    await store.dispatch('api/responseMiddleware', payload);

    return new Map(payload.data);
};

export const getSystem = async (id) => {
    const response = await fetch(`/api/systems/${id}`, {
        method: 'GET',
        headers: store.state.api.headers
    });
    const payload = { response, data: {}};
    await store.dispatch('api/responseMiddleware', payload);

    return new System(payload.data);
};