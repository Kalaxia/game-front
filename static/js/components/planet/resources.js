import resourcesData from '../../resources/resources.js';

const getDensityVisualization = (density, picto) => Array((Math.ceil(density / 20) + 1)).join(picto);

export const initPlanetResources = (list, data, storage) => {
    for (let resource of data) {
        const resourceKey = resource.name;
        resource = Object.assign(resource, resourcesData[resource.name]);
        const info = document.createElement('li');
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
        list.appendChild(info);
    }
};
