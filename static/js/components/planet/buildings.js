import buildingsData from '../../resources/buildings.js';

export const initPlanetBuildings = (container, planetId, buildings, maxBuildings, availableBuildings) => {
    for (const data of buildings) {
        const building = document.createElement('a');
        building.href =
            (data.status === 'operational' && typeof buildingsData[data.name].view !== 'undefined')
            ? `/views/base/${buildingsData[data.name].view}`
            : '/views/base/buildings.html'
        ;
        building.classList.add('building', `category-${buildingsData[data.name].category}`);
        if (data.status === 'constructing') {
            building.classList.add('constructing');
        }
        building.style.backgroundImage = `url('/static/images/buildings/${buildingsData[data.name].picture}')`;
        container.appendChild(building);
    }
    if (maxBuildings <= buildings.length) {
        return;
    }
    const area = document.createElement('a');
    area.classList.add('building', 'area');
    area.href = '/views/base/buildings.html';
    container.appendChild(area);
};
