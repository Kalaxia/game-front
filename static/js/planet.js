var searchParams = new URLSearchParams(window.location.search);
var id = searchParams.get('id');

getPlayer().then(() => {
  document.querySelector("#player-data h3").innerText = player.pseudo;
});

const initPlanet = () => fetch(`/api/planets/${id}`, {
    method: 'GET',
    headers: headers
  })
  .then(apiResponseMiddleware)
  .then(data => {
    var planet = document.querySelector("#planet");
    var planetStyle = window.getComputedStyle(planet);
    document.querySelector("#planet-data h3").innerText = data.name;
    document.querySelector("#planet-data em").innerText = dictionnary.planet.type[data.type];
    document.querySelector('#planet .shape').setAttribute('data-type', data.type);
    planet.style.top = `calc(50% - ${parseInt(planetStyle.height) / 2}px)`;
    planet.style.left = `calc(50% - ${parseInt(planetStyle.width) / 2}px)`;
    planet.style.display = "inline-block";

    initPlanetResources(document.querySelector("#planet-data ul"), data.resources);
  }).catch(error => console.log(error))
;

window.onload = initPlanet;
