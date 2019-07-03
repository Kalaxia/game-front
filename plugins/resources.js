export default async ({ app }, inject) => {
    const [ avatars, buildings, faction_motion_types, journey_range, journey_times, planet_types, resources, ship_frames, ship_modules ] = await Promise.all([
        app.$repositories.repository.call('GET', '/api/resources/avatars.json'),
        app.$repositories.repository.call('GET', `/api/resources/buildings.json`),
        app.$repositories.repository.call('GET', `/api/resources/motion_types.json`),
        app.$repositories.repository.call('GET', `/api/resources/journey_range.json`),
        app.$repositories.repository.call('GET', `/api/resources/journey_times.json`),
        app.$repositories.repository.call('GET', `/api/resources/planet_types.json`),
        app.$repositories.repository.call('GET', `/api/resources/resources.json`),
        app.$repositories.repository.call('GET', `/api/resources/ship_frames.json`),
        app.$repositories.repository.call('GET', `/api/resources/ship_modules.json`),
    ]);
    inject('resources', {
        avatars,
        buildings,
        faction_motion_types,
        journey_range,
        journey_times,
        planet_types,
        resources,
        ship_frames,
        ship_modules
    });
};