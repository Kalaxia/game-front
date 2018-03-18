var buildingsData;

fetch('/config/buildings.json', {cache: "no-store"})
.then(response => response.json())
.then(buildings => {
    buildingsData = buildings;
})

const initPlanetBuildings = (container, planetId, buildings, nbBuildings, availableBuildings) => {
    for (data of buildings) {
        let building = document.createElement('div');
        building.classList.add('building', `category-${buildingsData[data.name].category}`);
        if (building.status === 'constructing') {
            building.classList.add('constructing');
        }
        building.style["background-image"] = `url('/static/images/buildings/${buildingsData[data.name].picture}')`;
        container.appendChild(building);
        nbBuildings--;
    }
    if (nbBuildings <= 0) {
        return;
    }
    let overlay = document.createElement('div');
    overlay.id = 'buildings-overlay';
    overlay.addEventListener('click', toggleModal);

    document.body.appendChild(overlay);
    document.body.appendChild(generateModal(planetId, availableBuildings));

    for (let i = 0; i < nbBuildings; i++) {
        let area = document.createElement('div');
        area.classList.add('building', 'area');
        area.addEventListener('click', toggleModal);

        container.appendChild(area);
    }
};

const generateModal = (planetId, availableBuildings) => {
    let modal = document.createElement('div');
    modal.id = 'buildings-modal';
    modal.innerHTML = `<header></header><section>${availableBuildings.map(plan => {
        return `<div class="building category-${buildingsData[plan.name].category}" onclick="launchBuildingConstruction(${planetId}, '${plan.name}');" style="background-image:url('/static/images/buildings/${buildingsData[plan.name].picture}')">
            <div class="tooltip">
              <div class="tooltiptext">
                <ul>
                    <li>${plan.name}</li>
                    <li>${plan.duration}s</li>
                    ${plan.price.map(price => {
                        if (price.type === 'credits') {
                            return `<li>${price.amount}$</li>`;
                        }
                        let resource = resourcesData[price.resource_type];
                        return `<li>${price.amount} <img src="/static/images/resources/${resource.picto}" alt="${resource.name}"/></li>`;
                    }).join('')}
                </ul>
              </div>
            </div>
        </div>`;
    }).join('')}</section><footer></footer>`;
    return modal;
};

const toggleModal = () => {
    let modal = document.querySelector('#buildings-modal');
    let overlay = document.querySelector('#buildings-overlay');

    if (modal.classList.contains('visible')) {
        modal.classList.remove('visible');
        overlay.classList.remove('visible');
    } else {
        modal.classList.add('visible');
        overlay.classList.add('visible');
    }
};

const launchBuildingConstruction = (planetId, buildingName) => fetch(`/api/planets/${planetId}/buildings`, {
    method: "POST",
    body: JSON.stringify({
        name: buildingName
    }),
    headers: headers
}).then(response => response.json())
.then(response => {
    toggleModal();
});
