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
        displayStorage(planet, resourceTemp, listStorage);
    }
    displayDensity(planet, listStorage);
};

const displayStorage = (planet, resource, displayLocation) => {
    const resourceKey = resource.name;
    resource = Object.assign(resource, resourcesData[resourceKey]);
    const infoStorage = document.createElement('div');

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

export const displayDensity = (planet, container) => {
    var config = {
        type: 'polarArea',
        data: getDensityDatasets(planet.resources),
        options: {
            responsive: false,
            legend: {
                display: false,
            },
            scale: {
                gridLines: {
                    color: "#1F2125",
                    lineWidth: 1,
                },
                ticks: {
                    display: false,
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    stepSize: 25,
                    showLabelBackdrop: false,
                },
                tooltips: {
                  enabled: false,
                },
                hover: {
                  display: false,
                  mode: null,
                },
            },
        }
    };
    var ctx = document.getElementById("resource-density");

    ctx.style.height="500px";
    ctx.style.width="500px";

    var myChart = new Chart(ctx, config);
    var chartBackground = document.getElementById("chart-background");

    chartBackground.style.height=ctx.style.height;
    chartBackground.style.width= ctx.style.width;
    displayDensityPicto(planet.resources);
};

const getDensityDatasets = resources => {
    var resourceDataset = { data: [], backgroundColor: [], borderColor: [], borderWidth: 20 };
    var resData = resourcesData;
    var added = 0;
      for (const key in resources) {
          var resourceTemp = Object.assign({}, resData[resources[key].name]);
            var dataset = resourceDataset;
            var density = resources[key].density;
            var color = resourceTemp.color;

            dataset.data.push(density);
            dataset.backgroundColor.push(color);
            dataset.borderColor.push('#1F2125');
            added ++;
        }
        while (added < 6) {
            var dataset = resourceDataset;
            var density = 0;
            var color = "red";
            dataset.data.push(density);
            dataset.backgroundColor.push(color);
            dataset.borderColor.push('#090A0A');
            added ++;
        }

    return {
        datasets: [ resourceDataset],
    };
};

const displayDensityPicto = resources => {
    var added = 0;
    var chartBackground = document.getElementById("chart-background");
    var offset = parseInt(chartBackground.style.height);
    var pictoSize = 84;
    var imageSize = 64;
    var borderSize = 10;
    var resData = resourcesData;

    for (const key in resources) {
        var pictoBackground = document.createElement('div');

        pictoBackground.classList.add("density-picto")
        pictoBackground.style.height=pictoSize+"px";
        pictoBackground.style.width=pictoSize +"px";
        pictoBackground.style.borderWidth=borderSize+"px";

        pictoBackground.innerHTML=
            `<h5 class="storage-picto">
                <img class="resource-picto-density" style="padding-left:${(pictoSize-imageSize)/2}px;padding-top:${(pictoSize-imageSize)/2}px;" src="/static/images/resources/${resData[resources[key].name].picto}" alt="${resData[resources[key].name].name}"/>
            </h5>`
            ;

        const angle = ( ( Math.PI )*(-added/3 -1/6 ));// angles in radians
        var top = (Math.cos(angle) * offset/2);
        var left = (Math.sin(angle) * offset/2);

        pictoBackground.style.bottom =offset/2-(borderSize) -(pictoSize/2 )+ top+'px';
        pictoBackground.style.left = offset/2 -(borderSize) -(pictoSize/2 + left)+'px';

        chartBackground.appendChild(pictoBackground);
        added ++;
    }
    while (added < 6) { // completes the remaining densities with empty spaces to reach a total of 6
        var pictoBackground = document.createElement('div');

        pictoBackground.style.height=pictoSize+"px";
        pictoBackground.style.width=pictoSize +"px";
        pictoBackground.style.borderRadius="100%";
        pictoBackground.style.borderColor="#1F2125";
        pictoBackground.style.borderStyle="solid";
        pictoBackground.style.borderWidth=borderSize+"px";
        pictoBackground.style.backgroundColor="#090A0A";
        pictoBackground.style.position="absolute";

        const angle = ( ( Math.PI )*(-added/3 -1/6 ));// angles in radians
        var top = (Math.cos(angle) * offset/2);
        var left = (Math.sin(angle) * offset/2);

        pictoBackground.style.bottom =offset/2-(borderSize) -(pictoSize/2 )+ top+'px';
        pictoBackground.style.left = offset/2 -(borderSize) -(pictoSize/2 + left)+'px';

        chartBackground.appendChild(pictoBackground);
        added ++;
    }
}
