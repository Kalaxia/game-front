getCurrentPlayer().then(() => {
  var profileLink = document.createElement('a');
  profileLink.href = '/views/profile';
  profileLink.innerText = player.pseudo;
  document.querySelector("#player-data h3").appendChild(profileLink);
});

var planetId = getCurrentPlanet();
var planetPopulation = 0;
var planetSettings = {};
var availablePoints = 0;

/** POPULATION **/
const initBasePopulation = () => fetch(`/api/planets/${planetId}`, {
        method: 'GET',
        headers: headers
    })
    .then(apiResponseMiddleware)
    .then(data => {
        planetPopulation = data.population;
        planetSettings = data.settings;
        let populationPoints = getPopulationPoints(planetPopulation);

        document.querySelector('#planet-data > header > h1').innerHTML = dictionnary.planet.demography.replace("%planet%", `<a href="/views/map/planet.html?id=${planetId}">${data.name}</a>`);
        document.querySelector('#planet-population').innerHTML = dictionnary.planet.population.replace("%population%", planetPopulation);
        document.querySelector('#planet-points').innerHTML = dictionnary.planet.population_points.replace("%points%", populationPoints);

        initBasePoints(populationPoints);
    })
;

const initBasePoints = (populationPoints) => {
    availablePoints = populationPoints;
    let configuration = document.querySelector('#points-configuration > section');

    for (setting of ['services', 'building', 'military', 'research']) {
        let points = planetSettings[`${setting}_points`];
        let gauge = document.createElement('div');
        let percentage = getPercentage(points, populationPoints);
        gauge.classList.add('gauge-container');
        gauge.innerHTML =
            `<header><h4>${dictionnary.planet.settings[setting]}</h4></header>
            <section>
                <div id="${setting}-gauge" class="gauge">
                    <span class="gauge-indicator">
                        ${dictionnary.planet.population_points.replace("%points%", `<span>${points}</span>`)}
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
        dictionnary
        .planet
        .available_population_points
        .replace("%points%", `<span>${availablePoints}</span>`)
    ;
};

const getPercentage = (points, total) => {
    return Math.floor((points / total) * 100);
};

const getPopulationPoints = population => {
    return Math.floor(population / 100000);
};

const addPoint = setting => {
    if (availablePoints < 1) {
        return;
    }
    planetSettings[`${setting}_points`]++;
    availablePoints--;
    updateGauge(setting);
};

const substractPoint = setting => {
    if (planetSettings[`${setting}_points`] < 1) {
        return;
    }
    planetSettings[`${setting}_points`]--;
    availablePoints++;
    updateGauge(setting);
};

const updateGauge = setting => fetch(`/api/planets/${planetId}/settings`, {
    method: 'PUT',
    body: JSON.stringify(planetSettings),
    headers: headers,
}).then(apiResponseMiddleware)
.then(settings => {
    planetSettings = settings;
    let gauge = document.querySelector(`#${setting}-gauge`);
    let points = planetSettings[`${setting}_points`];
    let percentage = getPercentage(points, getPopulationPoints(planetPopulation));
    document.querySelector('#available-points span').innerText = availablePoints;
    gauge.querySelector('.gauge-indicator > span').innerText = points;
    gauge.querySelector('.gauge-indicator > em').innerText = percentage;
    gauge.querySelector('.gauge-content').style.width = `${percentage}%`;
});

/** BUILDINGS **/
var availableBuildings = [];

const initBaseBuildings = () => fetch(`/api/planets/${planetId}`, {
        method: 'GET',
        headers: headers
    })
    .then(apiResponseMiddleware)
    .then(data => {
        document.querySelector('.population-points').innerHTML =
            `<strong>${data.settings.building_points}</strong><img src="/static/images/buildings/build.svg"/>`
        ;
        document
            .querySelector('#planet-buildings > header > h3')
            .innerHTML = dictionnary.buildings.title.replace("%planet%", `<a href="/views/map/planet.html?id=${planetId}">${data.name}</a>`);
        availableBuildings = data.available_buildings;
        initBuildings(data.buildings, data.nb_buildings);
    })
;

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
    let building = document.createElement('div');
    building.id = (typeof data.id === 'undefined') ? `building-${data.name.replace(/\./g, '-')}` : `building-${data.id}`;
    building.classList.add('building', `category-${buildingsData[data.name].category}`);
    if (typeof data.price !== 'undefined' && data.price !== null) {
        for (price of data.price) {
            let icon = (price.type === 'points') ? 'industry-point' : 'credits';
            buildingInfo += `<div class="price"><span>${price.amount}</span><div class="${icon}"></div></div>`;
        }
        footer += `<footer><div class="build-button" onclick="launchBuildingConstruction('${data.name}');"></div></footer>`
    }
    if (typeof data.status !== 'undefined' && data.construction_state !== null) {
        building.classList.add('constructing');
        building.setAttribute('data-built-at', data.construction_state.built_at);
        building.setAttribute('data-points', data.construction_state.points);
        building.setAttribute('data-current-points', data.construction_state.current_points);

        let pointsPercent = Math.floor(data.construction_state.current_points * 100 / data.construction_state.points);
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
        `<header>${constructionOverlay}<img src="/static/images/buildings/${buildingsData[data.name].picture}"/></header>
            <section><h5>${dictionnary.buildings[data.name]}</h5>${buildingInfo}</section>${footer}
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
    var list = document.querySelector('#planet-available-buildings > section');
    for (building of availableBuildings) {
        list.appendChild(newBuilding(building));
    }
};

const refreshConstructionCountdown = buildingId => {
    var building = document.querySelector(`#${buildingId}`);
    var dateEntered = new Date(building.getAttribute('data-built-at'));
    var currentPoints = building.getAttribute('data-current-points');
    var points = building.getAttribute('data-points');
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();

    if (difference <= 0) {
        building.querySelector('.countdown').remove();
        clearInterval(timers[buildingId]);
        if (currentPoints === points) {
            building.classList.remove('constructing');
            building.querySelector('.construction-overlay').remove();
        }
        return;
    }
    var seconds = Math.floor(difference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    building.querySelector(`.countdown`).innerHTML = `${hours}:${minutes}:${seconds}`;
}

const launchBuildingConstruction = buildingName => fetch(`/api/planets/${planetId}/buildings`, {
    method: "POST",
    body: JSON.stringify({
        name: buildingName
    }),
    headers: headers
}).then(response => response.json())
.then(building => {
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
