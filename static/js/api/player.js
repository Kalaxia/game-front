import store from '../store';

export const createPlayer = async () => {
    const response = await fetch(`/api/players`, {
        method: 'POST',
        body: JSON.stringify({
            faction_id: store.state.user.player.faction.id,
            planet_id: store.state.user.planets[0].id
        }),
        headers: store.state.api.headers
    });
    const payload = { response, data: {}};
    await store.dispatch('api/responseMiddleware', payload);
};