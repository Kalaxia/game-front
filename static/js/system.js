var searchParams = new URLSearchParams(window.location.search);
var id = searchParams.get('id');

getPlayer().then(() => {
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
  for (key in planets) {
    var data = planets[key];
    generateOrbit(system, data.orbit);
    var orbitStyle = window.getComputedStyle(document.querySelector(`.orbit[data-id='${data.orbit.id}']`));
    var radius = parseInt(orbitStyle.width) / 2;
    var angle = Math.random() * (5 - 1) + 1;
    var planet = document.createElement("div");
    planet.classList.add('planet');
    planet.setAttribute('data-id', data.id);
    planet.setAttribute('data-type', data.type);
    planet.style.top = parseInt(orbitStyle.top) + radius + (Math.cos(angle) * radius) - 10 + 'px';
    planet.style.left = parseInt(orbitStyle.left) + radius + (Math.sin(angle) * radius) - 10 + 'px';
    planet.ondblclick = redirectToPlanet;
    system.appendChild(planet);
  }
};

const redirectToPlanet = event => {
  window.location = `/views/map/planet.html?id=${event.currentTarget.getAttribute('data-id')}`;
}
