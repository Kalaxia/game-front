import Dictionnary from './core/dictionnary.js';
import App from './core/app.js';
import resourcesData from './resources/resources.js';

/** PRODUCTION **/
const getDensityVisualization = (density, picto) => Array((Math.ceil(density / 20) + 1)).join(picto);

export const initBaseProduction = () => {
    const planet = App.getCurrentPlanet();
    var listResources = document.getElementById("planet-production");
    var listStorage = document.getElementById("planet-storage");
    for (let resource of planet.resources) {
        const resourceKey = resource.name;
        resource = Object.assign(resource, resourcesData[resource.name]);

        const infoResources = document.createElement('li');
        infoResources.innerHTML =
            `<h5>${resource.name}</h5>
            <div class="info">
                <div class="density">${getDensityVisualization(
                    resource.density,
                    `<img src="/static/images/resources/${resource.picto}" alt="${resource.name}"/>`
                )}</div>
                ${(typeof storage !== 'undefined' && storage !== null) ? `<div class="storage">${storage.resources[resourceKey]}</div>` : ''}
            </div>`
        ;
        listResources.appendChild(infoResources);
        const infoStorage = document.createElement('li');
        infoStorage.innerHTML =
            `<h5>${resource.name}</h5>
            <div class="info">

                ${(typeof planet.storage !== 'undefined' && planet.storage !== null) ? `<div class="storage">${planet.storage.resources[resourceKey]}/${planet.storage.capacity}</div>` : ''}
            </div>`
        listStorage.appendChild(infoStorage);
    }

    var listStorage = document.getElementById("planet-storage");
    for (let storage of planet.storage) {
        const resourceKey = resource.name;
        resource = Object.assign(resource, resourcesData[resource.name]);

        info.innerHTML =
            `<h5>${resource.name}</h5>
            <div class="info">
                <div class="density">${getDensityVisualization(
                    resource.density,
                    `<img src="/static/images/resources/${resource.picto}" alt="${resource.name}"/>`
                )}</div>
                ${(typeof storage !== 'undefined' && storage !== null) ? `<div class="storage">${storage.resources[resourceKey]}</div>` : ''}
            </div>`
        ;
        listStorage.appendChild(infoStorage);
    }
};
