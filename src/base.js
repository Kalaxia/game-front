import Dictionnary from './core/dictionnary.js';
import Building from './model/building.js';
import buildingsData from './resources/buildings.json';
import App from './core/app.js';

let planetPopulation = 0;
let availablePoints = 0;

/** POPULATION **/
export const initBasePopulation = () => {
    const planet = App.getCurrentPlanet();
    planetPopulation = planet.population;
    const populationPoints = getPopulationPoints(planetPopulation);

    document.querySelector('#planet-data > header > h1').innerHTML = Dictionnary.translations.planet.demography.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}">${planet.name}</a>`);
    document.querySelector('#planet-population').innerHTML = Dictionnary.translations.planet.population.replace("%population%", planetPopulation);
    document.querySelector('#planet-points').innerHTML = Dictionnary.translations.planet.population_points.replace("%points%", populationPoints);

    initBasePoints(populationPoints);
};

const initBasePoints = populationPoints => {
    availablePoints = populationPoints;
    const configuration = document.querySelector('#points-configuration > section');

    for (const setting of ['services', 'building', 'military', 'research']) {
        const points = App.getCurrentPlanet().settings[`${setting}_points`];
        const gauge = document.createElement('div');
        const percentage = getPercentage(points, populationPoints);
        gauge.classList.add('gauge-container');
        gauge.innerHTML =
            `<header><h4>${Dictionnary.translations.planet.settings[setting]}</h4></header>
            <section>
                <div id="${setting}-gauge" class="gauge">
                    <span class="gauge-indicator">
                        ${Dictionnary.translations.planet.population_points.replace("%points%", `<span>${points}</span>`)}
                        (<em>${percentage}</em>%)
                    </span>
                    <div class="gauge-content" style="width:${percentage}%"></div>
                    <span class="gauge-add" onclick="addPoint('${setting}')">+</span>
                    <span class="gauge-substract" onclick="substractPoint('${setting}')">-</span>
                </div>
            </section>`
        ;
        configuration.appendChild(gauge);
        availablePoints -= points;
    }
    document.querySelector('#available-points').innerHTML =
        Dictionnary
        .translations
        .planet
        .available_population_points
        .replace("%points%", `<span>${availablePoints}</span>`)
    ;
};

const getPercentage = (points, total) => Math.floor((points / total) * 100);

const getPopulationPoints = population => Math.floor(population / 100000);

export const addPoint = setting => {
    if (availablePoints < 1) {
        return;
    }
    App.getCurrentPlanet().settings[`${setting}_points`]++;
    availablePoints--;
    updateGauge(setting);
};

export const substractPoint = setting => {
    if (App.getCurrentPlanet().settings[`${setting}_points`] < 1) {
        return;
    }
    App.getCurrentPlanet().settings[`${setting}_points`]--;
    availablePoints++;
    updateGauge(setting);
};

const updateGauge = setting => App.getCurrentPlanet().updateSettings().then(() => {
    const gauge = document.querySelector(`#${setting}-gauge`);
    let points = App.getCurrentPlanet().settings[`${setting}_points`];
    let percentage = getPercentage(points, getPopulationPoints(planetPopulation));
    document.querySelector('#available-points span').innerText = availablePoints;
    gauge.querySelector('.gauge-indicator > span').innerText = points;
    gauge.querySelector('.gauge-indicator > em').innerText = percentage;
    gauge.querySelector('.gauge-content').style.width = `${percentage}%`;
});

/** BUILDINGS **/
let availableBuildings = [];

export const initBaseBuildings = () => {
    const planet = App.getCurrentPlanet();
    document.querySelector('.population-points').innerHTML =
        `<strong>${planet.settings.building_points}</strong><img src="/images/buildings/build.svg"/>`
    ;
    document.querySelector('#planet-buildings > header > h3').innerHTML =
        Dictionnary.translations.buildings.title.replace("%planet%", `<a href="/views/map/planet.html?id=${planet.id}">${planet.name}</a>`)
    ;
    availableBuildings = planet.available_buildings;
    initBuildings(planet.buildings, planet.nb_buildings);
};

const initBuildings = (buildings, maxBuildings) => {
    var list = document.querySelector('#planet-buildings > section');
    for (let building of buildings) {
        list.appendChild(newBuilding(building));
    }
    if (maxBuildings <= buildings.length) {
        return;
    }
    let area = newBuilding({name: "area"});
    area.addEventListener('click', showAvailableBuildings);
    list.appendChild(area);
}

var timers = [];

const newBuilding = data => {
    let buildingInfo = '';let footer = '';let constructionOverlay = '';
    const building = document.createElement('div');
    building.id = (typeof data.id === 'undefined') ? `building-${data.name.replace(/\./g, '-')}` : `building-${data.id}`;
    building.classList.add('building', `category-${buildingsData[data.name].category}`);
    if (typeof data.price !== 'undefined' && data.price !== null) {
        for (const price of data.price) {
            const icon = (price.type === 'points') ? 'industry-point' : 'credits';
            buildingInfo += `<div class="price"><span>${price.amount}</span><div class="${icon}"></div></div>`;
        }
        footer += `<footer><div class="build-button" onclick="launchBuildingConstruction('${data.name}');"></div></footer>`
    }
    if (typeof data.status !== 'undefined' && data.construction_state !== null) {
        building.classList.add('constructing');
        building.setAttribute('data-built-at', data.construction_state.built_at);
        building.setAttribute('data-points', data.construction_state.points);
        building.setAttribute('data-current-points', data.construction_state.current_points);

        const pointsPercent = Math.floor(data.construction_state.current_points * 100 / data.construction_state.points);
        constructionOverlay = '<div class="construction-overlay"></div>';
        buildingInfo +=
            `<div class="countdown"></div>
            <div class="points">
                <span>${data.construction_state.current_points}</span>
                <div class="progressbar"><div style="width:${pointsPercent}%"></div></div>
                <span>${data.construction_state.points}</span>
                <div class="industry-point"></div>
            </div>`
        ;
        timers[building.id] = setInterval(() => refreshConstructionCountdown(building.id), 1000);
    }

    building.innerHTML =
        `<header>${constructionOverlay}<img src="/images/buildings/${buildingsData[data.name].picture}"/></header>
            <section><h5>${Dictionnary.translations.buildings[data.name]}</h5>${buildingInfo}</section>${footer}
        `
    ;
    return building;
};

const showAvailableBuildings = event => {
    if (event.currentTarget.classList.contains('selected')) {
        return;
    }
    event.currentTarget.classList.add('selected');
    document.querySelector('#planet-available-buildings').classList.add('visible');
    document.querySelectorAll('#planet-available-buildings > section .building').forEach(e => e.remove());
    const list = document.querySelector('#planet-available-buildings > section');
    for (const building of availableBuildings) {
        list.appendChild(newBuilding(building));
    }
};

const refreshConstructionCountdown = buildingId => {
    const building = document.querySelector(`#${buildingId}`);
    const dateEntered = new Date(building.getAttribute('data-built-at'));
    const currentPoints = building.getAttribute('data-current-points');
    const points = building.getAttribute('data-points');
    const now = new Date();
    const difference = dateEntered.getTime() - now.getTime();

    if (difference <= 0) {
        building.querySelector('.countdown').remove();
        clearInterval(timers[buildingId]);
        if (currentPoints === points) {
            building.classList.remove('constructing');
            building.querySelector('.construction-overlay').remove();
        }
        return;
    }
    let seconds = Math.floor(difference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    building.querySelector(`.countdown`).innerHTML = `${hours}:${minutes}:${seconds}`;
}

export const launchBuildingConstruction = buildingName => Building.create(App.getCurrentPlanet(), buildingName).then(building => {
    availableBuildings = building.planet.available_buildings;
    document.querySelector('.building.category-area.selected').remove();
    let list = document.querySelector('#planet-buildings > section');
    list.appendChild(newBuilding(building));
    if (building.planet.nb_buildings > document.querySelectorAll('#planet-buildings .building').length) {
        let area = newBuilding({name: "area"});
        area.addEventListener('click', showAvailableBuildings);
        list.appendChild(area);
    }
    document.querySelector('#planet-available-buildings').classList.remove('visible');
});

/** FLEET **/



/** HANGARD **/
