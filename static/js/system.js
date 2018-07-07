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
    var radius = parseInt(orbitStyle.width) / 2; //(1-1000)
    var top = parseInt(orbitStyle.top) + radius + (Math.cos(angle) * radius);
    var left = parseInt(orbitStyle.left) + radius + (Math.sin(angle) * radius);
    //var angle = Math.random() * (5 - 1) + 1;
    var time = 0;// get the time since the beginning of the server
    var offsetAngle = 0; //starting position when the server started
    var PI = 3.14159265358979;
    var starMass = 10; //(1-200) 10 -> our sun
    var calcRadius = radius * 1000;
    var calc = ((2*PI)*(radius * radius * radius))/ (starMass * 6.674 * 2);
    var angle = (calc/365)%360;
    var planet = document.createElement("div");
    planet.classList.add('planet');
    planet.setAttribute('da ta-id', data.id);
    planet.setAttribute('data-type', data.type);
    planet.style.top = top - 10 + 'px';
    planet.style.left = left - 10 + 'px';
    planet.addEventListener('dblclick', redirectToPlanet);
    planet.addEventListener('mousedown', event => handleMouseDown(event, '/views/map/planet.html?id={id}'));
    planet.addEventListener('mouseup', handleMouseUp);
    if (data.player !== null) {
        var factionFlag = document.createElement('div');
        factionFlag.classList.add('faction-flag');
        factionFlag.style.top = top - 20 + 'px';
        factionFlag.style.left = left - 20 + 'px';
        factionFlag.style.backgroundColor = data.player.faction.color;
        factionFlag.style.boxShadow = `0px 0px 10px ${data.player.faction.color}`;
        system.appendChild(factionFlag);
    }
    system.appendChild(planet);
  }
};

const redirectToPlanet = event => {
  window.location = `/views/map/planet.html?id=${event.currentTarget.getAttribute('data-id')}`;
}
