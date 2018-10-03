import Dictionnary from './core/dictionnary.js';
import App from './core/app.js';
import resourcesData from './resources/resources.js';
import {formatNumber, formatDate} from './core/formater.js';

/** PRODUCTION **/
export const getDensityVisualization = (density, picto) => Array((Math.ceil(density / 20) + 1)).join(picto);

export const initBaseProduction = () => {
    const planet = App.getCurrentPlanet();
    const listResources = document.getElementById("planet-production");
    const listStorage = document.getElementById("planet-storage");
    for (let resource of planet.resources) {
        const resourceTemp = Object.assign({}, resource);
        displayStorage(planet, resourceTemp, listStorage);
    }
    displayDensity(planet);
};

const displayStorage = (planet, resource, displayLocation) => {
    const resourceKey = resource.name;
    resource = Object.assign(resource, resourcesData[resourceKey]);
    const infoStorage = document.createElement('div');

    const now = new Date();
    infoStorage.className ="full-storage-display";
    infoStorage.innerHTML =
        `<h5 class="storage-picto"><img src="/static/images/resources/${resource.picto}" alt="${resource.name}"/>
        </h5>
        <div class="info">
            ${(typeof planet.storage !== 'undefined' && planet.storage !== null) ? `
            <div class="storage">
                <div class ="storage-status">
                    <div class="current-amount" id="current-amount-${resource.name}">${formatNumber(planet.storage.resources[resourceKey]).short}
                    </div>
                 / ${formatNumber(planet.storage.capacity).short[0]}
                </div>
                <div class="storage-line">
                    <div class="storage-display ${resource.name}">
                        <div class="storage-full" id="storage-full-${resource.name}"></div>
                        <div class="storage-empty"></div>
                    </div>
                    <div id="full-capacity-time-${resource.name}">
                        ${(planet.storage.capacity - planet.storage.resources[resourceKey])===0?
                        "Full" : "-" + formatTime(new Date(now.getYear(), now.getMonth(),now.getDate(), now.getHours()+1+Math.floor((planet.storage.capacity - planet.storage.resources[resourceKey]) /(resource.density*10))))}
                    </div>
                </div>
                <div class="hourly-production">+${resource.density*10}/h
                </div>
            </div>` : ''}
        </div>`
        ;
    displayLocation.appendChild(infoStorage);

    const storageFull = document.getElementById( "storage-full-"+resource.name);
    storageFull.style.width = (100*planet.storage.resources[resourceKey]/planet.storage.capacity)+"%";
    storageFull.style.backgroundColor = resource.color;

    if( planet.storage.resources[resourceKey] === planet.storage.capacity) {
        const currentAmount = document.getElementById("current-amount-"+resource.name);
        currentAmount.style.color='#FF0066';
        const timeLeftToFull = document.getElementById("full-capacity-time-"+resource.name);
        timeLeftToFull.style.color='#FF0066';
    }
};



export const displayDensity = (planet) => {
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
                  color: "#090A0A",
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
    const ctx = document.getElementById("resource-density");

    ctx.style.height="500px";
    ctx.style.width="500px";

    const myChart = new Chart(ctx, config);
    const chartBackground = document.getElementById("chart-background");

    chartBackground.style.height=ctx.style.height;
    chartBackground.style.width= ctx.style.width;
    displayDensityPicto(planet.resources);
};

const getDensityDatasets = resources => {
    const resourceDataset = { data: [], backgroundColor: [], borderColor: [], borderWidth: 20 };
    const resData = resourcesData;
    let added = 0;
    const numberOfResources = 6;
    for (const key in resources) {
          const resourceTemp = Object.assign({}, resData[resources[key].name]);
          const dataset = resourceDataset;
          const density = resources[key].density;
          const color = resourceTemp.color;

          dataset.data.push(density);
          dataset.backgroundColor.push(color);
          dataset.borderColor.push('#090A0A');
          added ++;
      }
      while (added < numberOfResources) {
          const dataset = resourceDataset;
          const density = 0;
          const color = "red";
          dataset.data.push(density);
          dataset.backgroundColor.push(color);
          dataset.borderColor.push('#E12024');
          added ++;
      }
    return {
        datasets: [ resourceDataset],
    };
};

const displayDensityPicto = resources => {
    let added = 0;
    const chartBackground = document.getElementById("chart-background");
    const offset = parseInt(chartBackground.style.height);
    const pictoSize = 64;
    const imageSize = 64;
    const borderSize = 10;
    const resData = resourcesData;

    for (const key in resources) {
        const pictoBackground = document.createElement('div');

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
        const top = (Math.cos(angle) * offset/2);
        const left = (Math.sin(angle) * offset/2);

        pictoBackground.style.bottom =offset/2-(borderSize) -(pictoSize/2 )+ top+'px';
        pictoBackground.style.left = offset/2 -(borderSize) -(pictoSize/2 + left)+'px';

        chartBackground.appendChild(pictoBackground);
        added ++;
    }
    while (added < 6) { // completes the remaining densities with empty spaces to reach a total of 6
        const pictoBackground = document.createElement('div');

        pictoBackground.style.height=pictoSize+"px";
        pictoBackground.style.width=pictoSize +"px";
        pictoBackground.style.borderRadius="100%";
        pictoBackground.style.borderColor="#090A0A";
        pictoBackground.style.borderStyle="solid";
        pictoBackground.style.borderWidth=borderSize+"px";
        pictoBackground.style.backgroundColor="#1E2024";
        pictoBackground.style.position="absolute";

        const angle = ( ( Math.PI )*(-added/3 -1/6 ));// angles in radians
        const top = (Math.cos(angle) * offset/2);
        const left = (Math.sin(angle) * offset/2);

        pictoBackground.style.bottom =offset/2-(borderSize) -(pictoSize/2 )+ top+'px';
        pictoBackground.style.left = offset/2 -(borderSize) -(pictoSize/2 + left)+'px';

        chartBackground.appendChild(pictoBackground);
        added ++;
    }
}
