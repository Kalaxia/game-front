import App from './core/app.js';
import resourcesData from './resources/resources';

/** PRODUCTION **/
export const getDensityVisualization = (density, picto) => Array((Math.ceil(density / 20) + 1)).join(picto);

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
