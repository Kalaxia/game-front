import fetch from 'node-fetch';

export default async ({ app }, inject) => {
    const [ buildings, journey_range, journey_times, planet_types, resources, ship_frames, ship_modules ] = await Promise.all([
        app.$repositories.repository.call('GET', `/api/resources/buildings.json`),
        app.$repositories.repository.call('GET', `/api/resources/journey_range.json`),
        app.$repositories.repository.call('GET', `/api/resources/journey_times.json`),
        app.$repositories.repository.call('GET', `/api/resources/planet_types.json`),
        app.$repositories.repository.call('GET', `/api/resources/resources.json`),
        app.$repositories.repository.call('GET', `/api/resources/ship_frames.json`),
        app.$repositories.repository.call('GET', `/api/resources/ship_modules.json`),
    ]);
    console.log(buildings);
    inject('resources', {
        buildings,
        journey_range,
        journey_times,
        planet_types,
        resources,
        ship_frames,
        ship_modules
    });
};