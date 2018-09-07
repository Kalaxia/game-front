import Dictionnary from './core/dictionnary.js';
import App from './core/app.js';
import resourcesData from './resources/resources.js';

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

/** PRODUCTION **/
const getDensityVisualization = (density, picto) => Array((Math.ceil(density / 20) + 1)).join(picto);

export const initBaseProduction = () => {
    const planet = App.getCurrentPlanet();
    var listResources = document.getElementById("planet-production");
    var listStorage = document.getElementById("planet-storage");
    for (let resource of planet.resources) {
        const resourceKey = resource.name;
        resource = Object.assign(resource, resourcesData[resource.name]);

        const infoResources = document.createElement('div');
        infoResources.innerHTML =
            `<h5>${resource.name}</h5>
            <div class="info">
                <div class="density">${getDensityVisualization(
                    resource.density,
                    `<img src="/static/images/resources/${resource.picto}" alt="${resource.name}"/>`
                )}</div>
                <h5>Production:${resource.density*10} /h</h5>
            </div>`
        ;
        listResources.appendChild(infoResources);
        const infoStorage = document.createElement('div');
        infoStorage.innerHTML =
            `<h5>${resource.name}</h5>
            <div class="info">
                ${(typeof planet.storage !== 'undefined' && planet.storage !== null) ? `<div class="storage"><div class="current-amount" id="current-amount-${resource.name}">${planet.storage.resources[resourceKey]}</div> / ${planet.storage.capacity}
                <div class="storage-display ${resource.name}"><div class="storage-full" id="storage-full-${resource.name}"></div><div class="storage-empty"></div></div>
                <div class="full-capacity-time">${(planet.storage.capacity-planet.storage.resources[resourceKey])/(resource.density*10)===0? "Full" : "-"(planet.storage.capacity-planet.storage.resources[resourceKey])/(resource.density*10) +"h"}</div></div>` : ''}
            </div>`
        listStorage.appendChild(infoStorage);
        var idName = "storage-full-"+resource.name;
        const storageFull = document.getElementById(idName);
        storageFull.style.width = "100%";
        storageFull.style.backgroundColor = resource.color;

        if( planet.storage.resources[resourceKey] === planet.storage.capacity) {
            var idName = "current-amount-"+resource.name;
            const currentAmount = document.getElementById(idName);
            currentAmount.style.color='red';
        }
    }
};
