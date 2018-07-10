window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
var searchParams = new URLSearchParams(window.location.search);
var id = searchParams.get('id');

getCurrentPlayer().then(() => {
  var profileLink = document.createElement('a');
  profileLink.href = '/views/profile';
  profileLink.innerText = player.pseudo;
  document.querySelector("#player-data h3").appendChild(profileLink);
});

fetch(`/api/systems/${id}`, {
    method: 'GET',
    headers: headers
})
.then(apiResponseMiddleware)
.then(data => {
  var system = document.querySelector("#system");
  var star = document.querySelector("#star");
  generatePlanets(system, data.planets);
  var starStyle = window.getComputedStyle(star);
  star.style.top = `calc(50% - ${parseInt(starStyle.height) / 2}px)`;
  star.style.left = `calc(50% - ${parseInt(starStyle.width) / 2}px)`;
  initTouchEvents('/views/map', '/views/map/planet.html?id={id}', 'planet');
}).catch(error => console.log(error));

const generateOrbit = (system, data) => {
  var orbit = document.createElement("div");
  orbit.classList.add('orbit');
  orbit.style.width = `${data.radius}px`;
  orbit.style.height = `${data.radius}px`;
  orbit.style.top = `calc(50% - ${(data.radius / 2) + 1}px)`;
  orbit.style.left = `calc(50% - ${(data.radius / 2) + 1}px)`;
  orbit.setAttribute('data-id', data.id);
  system.appendChild(orbit);
};

const generatePlanets = (system, planets) => {
  for (data of planets) {
    generateOrbit(system, data.orbit);
    var orbitStyle = window.getComputedStyle(document.querySelector(`.orbit[data-id='${data.orbit.id}']`));
    var radius = parseInt(orbitStyle.width) / 2; //(1-1000) would be values coherent in physics
    var top = parseInt(orbitStyle.top) + radius + (Math.cos(angle) * radius);
    var left = parseInt(orbitStyle.left) + radius + (Math.sin(angle) * radius);
    // formula : timeToRotate = 2*PI *sqrt(radius^3/(6.674*10^-11 . starMass)) with radius in meters, starMass in kg and time in seconds
    // note : the powers of 10 have been simplified to reduce the values as much as possible
    var timeElapsed = Date.now()/1000;// /1000 to get time in seconds
    var angleOffset = 0; //offset the startingPosition
    var starMass = 200; //(1-200) would be values coherent in physics. 10 is our sun's mass
    var calcRadius = radius*1000 ; // times 1000 to fit the formula and take into consideration the units
    var gravitationalConstant = 2 * 6.674 ; //2 is for the mass of the smallest star and 6.674 is from the gravitational constant G
    var timeToRotate = ((2*Math.PI)*Math.sqrt((calcRadius * calcRadius * calcRadius)/ (starMass * gravitationalConstant)))/(365.25*24);
    var timeIntoCurrentRotation =timeElapsed%timeToRotate;
    var angle =(angleOffset + (timeIntoCurrentRotation/timeToRotate*(2*Math.PI)));// angles in radians

    var planet = document.createElement("div");
    planet.classList.add('planet');
    planet.setAttribute('timeToRotate', timeToRotate);
    planet.setAttribute('angleOffset', angleOffset);
    planet.setAttribute('data-id', data.id);
    planet.setAttribute('data-type', data.type);
    planet.setAttribute('orbit-id',data.orbit.id);
    planet.style.top = top - 10 + 'px';
    planet.style.left = left - 10 + 'px';
    planet.addEventListener('dblclick', redirectToPlanet);
    planet.addEventListener('mousedown', event => handleMouseDown(event, '/views/map/planet.html?id={id}'));
    planet.addEventListener('mouseup', handleMouseUp);
    if (data.player !== null) {
        var factionFlag = document.createElement('div');
        factionFlag.classList.add('faction-flag');
        factionFlag.setAttribute('planet-id', data.id);
        factionFlag.style.top = top - 20 + 'px';
        factionFlag.style.left = left - 20 + 'px';
        factionFlag.style.backgroundColor = data.player.faction.color;
        factionFlag.style.boxShadow = `0px 0px 10px ${data.player.faction.color}`;
        system.appendChild(factionFlag);
    }
    system.appendChild(planet);
  }
  requestAnimationFrame(systemRotation);
};

function systemRotation() {
  document.querySelectorAll(`.planet`).forEach(rotatePlanet);
  document.querySelectorAll(`.faction-flag`).forEach(rotateFlags);
  requestAnimationFrame(systemRotation);
}

function rotatePlanet(planet)
{
  var orbitStyle = window.getComputedStyle(document.querySelector(`.orbit[data-id='${planet.getAttribute("orbit-id")}']`));
  var radius = parseInt(orbitStyle.width) / 2; //(1-1000) would be values coherent in physics
  var timeElapsed = Date.now()/1000;// /1000 to get time in seconds
  var timeToRotate =planet.getAttribute("timeToRotate");
  var angleOffset = planet.getAttribute("angleOffset");
  var timeIntoCurrentRotation =timeElapsed%timeToRotate;
  var angle =(angleOffset + (timeIntoCurrentRotation/timeToRotate*(2*Math.PI)));// angles in radians
  var top = parseInt(orbitStyle.top) + radius + (Math.cos(angle) * radius);
  var left = parseInt(orbitStyle.left) + radius + (Math.sin(angle) * radius);
  planet.style.top = top - 10 + 'px';
  planet.style.left = left - 10 + 'px';
}

function rotateFlags(flag)
{
  var planetStyle = window.getComputedStyle(document.querySelector(`.planet[data-id='${flag.getAttribute("planet-id")}']`));
  var top = parseInt(planetStyle.top);
  var left = parseInt(planetStyle.left);
  flag.style.top = top - 10 + 'px';
  flag.style.left = left - 10 + 'px';
}


const redirectToPlanet = event => {
  window.location = `/views/map/planet.html?id=${event.currentTarget.getAttribute('data-id')}`;
}
