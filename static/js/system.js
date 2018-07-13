import Player from './model/player.js';
import System from './model/system.js';

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

Player.fetchCurrentPlayer().then(player => {
    const profileLink = document.createElement('a');
    profileLink.href = '/views/profile';
    profileLink.innerText = player.pseudo;
    document.querySelector("#player-data h3").appendChild(profileLink);
});

System.fetch(id).then(system => {
    const systemElement = document.querySelector("#system");
    const star = document.querySelector("#star");
    generatePlanets(systemElement, system.planets);
    const starStyle = window.getComputedStyle(star);
    star.style.top = `calc(50% - ${parseInt(starStyle.height) / 2}px)`;
    star.style.left = `calc(50% - ${parseInt(starStyle.width) / 2}px)`;
    initTouchEvents('/views/map', '/views/map/planet.html?id={id}', 'planet');
});

const generateOrbit = (systemElement, data) => {
    const orbit = document.createElement("div");
    orbit.classList.add('orbit');
    orbit.style.width = `${data.radius}px`;
    orbit.style.height = `${data.radius}px`;
    orbit.style.top = `calc(50% - ${(data.radius / 2) + 1}px)`;
    orbit.style.left = `calc(50% - ${(data.radius / 2) + 1}px)`;
    orbit.setAttribute('data-id', data.id);
    systemElement.appendChild(orbit);
};

const generatePlanets = (systemElement, planets) => {
    for (const planet of planets) {
        generateOrbit(systemElement, planet.orbit);
        const orbitStyle = window.getComputedStyle(document.querySelector(`.orbit[data-id='${planet.orbit.id}']`));
        const radius = parseInt(orbitStyle.width) / 2;
        const top = parseInt(orbitStyle.top) + radius + (Math.cos(angle) * radius);
        const left = parseInt(orbitStyle.left) + radius + (Math.sin(angle) * radius);
        // formula : timeToRotate = 2*PI *sqrt(radius^3/(6.674*10^-11 . starMass)) with radius in meters, starMass in kg and time in seconds
        // note : the powers of 10 have been simplified to reduce the values as much as possible
        const timeElapsed = Date.now()/1000;// /1000 to get time in seconds
        const angleOffset = 0; //offset the startingPosition
        const starMass = 200; //(1-200) would be values coherent in physics. 10 is our sun's mass
        const calcRadius = radius * 1000 ; // times 1000 to fit the formula and take into consideration the units
        const gravitationalConstant = 2 * 6.674 ; //2 is for the mass of the smallest star and 6.674 is from the gravitational constant G
        const numberOfHoursInYear = 365.25*24;// to change earth rotation time ffor one year to one hour
        const timeToRotate = (( 2 * Math.PI ) * Math.sqrt((calcRadius * calcRadius * calcRadius)/ (starMass * gravitationalConstant))) / numberOfHoursInYear;
        const timeIntoCurrentRotation = timeElapsed % timeToRotate;
        const angle = (angleOffset + (timeIntoCurrentRotation / timeToRotate * ( 2 * Math.PI )));// angles in radians

        const planetElement = document.createElement("div");
        planetElement.classList.add('planet');
        planetElement.setAttribute('data-time-to-rotate', timeToRotate);
        planetElement.setAttribute('data-angle-offset', angleOffset);
        planetElement.setAttribute('data-id', planet.id);
        planetElement.setAttribute('data-type', planet.type);
        planetElement.setAttribute('data-orbit-id',planet.orbit.id);
        planetElement.style.top = top - 10 + 'px';
        planetElement.style.left = left - 10 + 'px';
        planetElement.addEventListener('dblclick', redirectToPlanet);
        if (planet.player !== null) {
            const factionFlag = document.createElement('div');
            factionFlag.classList.add('faction-flag');
            factionFlag.setAttribute('data-planet-id', data.id);
            factionFlag.style.top = top - 20 + 'px';
            factionFlag.style.left = left - 20 + 'px';
            factionFlag.style.backgroundColor = planet.player.faction.color;
            factionFlag.style.boxShadow = `0px 0px 10px ${planet.player.faction.color}`;
            systemElement.appendChild(factionFlag);
        }
        systemElement.appendChild(planetElement);
    }
    requestAnimationFrame(systemRotation);
};

const systemRotation = () => {
    document.querySelectorAll(`.planet`).forEach(rotatePlanet);
    document.querySelectorAll(`.faction-flag`).forEach(rotateFlag);
    requestAnimationFrame(systemRotation);
}

const rotatePlanet = planet => {
    const orbitStyle = window.getComputedStyle(document.querySelector(`.orbit[data-id='${planet.getAttribute("data-orbit-id")}']`));
    const radius = parseInt(orbitStyle.width) / 2; //(1-1000) would be values coherent in physics
    const timeElapsed = Date.now() / 1000;// /1000 to get time in seconds
    const timeToRotate = planet.getAttribute("data-time-to-rotate");
    const angleOffset = planet.getAttribute("data-angle-offset");
    const timeIntoCurrentRotation = timeElapsed % timeToRotate;
    const angle =(angleOffset + (timeIntoCurrentRotation / timeToRotate * ( 2 * Math.PI )));// angles in radians
    const top = parseInt(orbitStyle.top) + radius + (Math.cos(angle) * radius);
    const left = parseInt(orbitStyle.left) + radius + (Math.sin(angle) * radius);
    planet.style.top = top - 10 + 'px';
    planet.style.left = left - 10 + 'px';
}

const rotateFlag = flag {
    const planetStyle = window.getComputedStyle(document.querySelector(`.planet[data-id='${flag.getAttribute("data-planet-id")}']`));
    const top = parseInt(planetStyle.top);
    const left = parseInt(planetStyle.left);
    flag.style.top = top - 10 + 'px';
    flag.style.left = left - 10 + 'px';
}


const redirectToPlanet = event => {
    window.location = `/views/map/planet.html?id=${event.currentTarget.getAttribute('data-id')}`;
}
