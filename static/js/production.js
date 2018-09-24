import Dictionnary from './core/dictionnary.js';
import App from './core/app.js';
import resourcesData from './resources/resources.js';

/** PRODUCTION **/
export const getDensityVisualization = (density, picto) => Array((Math.ceil(density / 20) + 1)).join(picto);

export const initBaseProduction = () => {
    const planet = App.getCurrentPlanet();
    var listResources = document.getElementById("planet-production");
    var listStorage = document.getElementById("planet-storage");
    for (let resource of planet.resources) {
        var resourceTemp = Object.assign({}, resource);
        displayDensity(planet, resourceTemp, listResources);
        resourceTemp = Object.assign({}, resource);
        displayStorage(planet, resourceTemp, listStorage);
    }
};

export const displayDensity = (planet, resource, diplayLocation) => {
    const resourceKey = resource.name;
    resource = Object.assign(resource, resourcesData[resourceKey]);

    const infoResources = document.createElement('div');
    infoResources.innerHTML =
        `<h5>${resource.name}</h5>
        <div class="info">
            <div class="density">${getDensityVisualization(
                resource.density,
                `<img src="/static/images/resources/${resource.picto}" alt="${resource.name}"/>`
            )}</div>
            <h5>Production: ${resource.density*10} /h</h5>
        </div>`
    ;
    diplayLocation.appendChild(infoResources);
};

const displayStorage = (planet, resource, displayLocation) => {
    const resourceKey = resource.name;
    resource = Object.assign(resource, resourcesData[resourceKey]);
    const infoStorage = document.createElement('div');
    if (resource.name === "ResLiquide")
    {
        planet.storage.resources[resourceKey]=2000;
    }
    var now = new Date();
    infoStorage.className ="full-storage-display";
    infoStorage.innerHTML =
        `<h5 class="storage-picto"><img src="/static/images/resources/${resource.picto}" alt="${resource.name}"/>
        </h5>
        <div class="info">
            ${(typeof planet.storage !== 'undefined' && planet.storage !== null) ? `
            <div class="storage">
                <div class ="storage-status">
                    <div class="current-amount" id="current-amount-${resource.name}">${planet.storage.resources[resourceKey]}
                    </div>
                 / ${planet.storage.capacity}
                </div>
                <div class="storage-line">
                    <div class="storage-display ${resource.name}">
                        <div class="storage-full" id="storage-full-${resource.name}"></div>
                        <div class="storage-empty"></div>
                    </div>
                    <div id="full-capacity-time-${resource.name}">
                        ${(planet.storage.capacity - planet.storage.resources[resourceKey])===0?
                        "Full" : "-" + Math.floor((planet.storage.capacity - planet.storage.resources[resourceKey]) /(resource.density*10)) +"h"+ (60- now.getMinutes())+"min"}
                    </div>
                </div>
                <div class="hourly-production">+${resource.density*10}/h
                </div>
            </div>` : ''}
        </div>`
        ;
    displayLocation.appendChild(infoStorage);
    var idName = "storage-full-"+resource.name;
    const storageFull = document.getElementById(idName);
    storageFull.style.width = (100*planet.storage.resources[resourceKey]/planet.storage.capacity)+"%";
    storageFull.style.backgroundColor = resource.color;

    if( planet.storage.resources[resourceKey] === planet.storage.capacity) {
        var idName = "current-amount-"+resource.name;
        const currentAmount = document.getElementById(idName);
        currentAmount.style.color='#FF0066';
        idName = "full-capacity-time-"+resource.name;
        const timeLeftToFull = document.getElementById(idName);
        timeLeftToFull.style.color='#FF0066';
    }
};
