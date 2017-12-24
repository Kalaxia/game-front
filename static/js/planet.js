var searchParams = new URLSearchParams(window.location.search);
var id = searchParams.get('id');

const initPlanet = () => fetch(`/api/planets/${id}`, {
    method: 'GET',
    headers: headers
  }).then(response => {
    if (response.status === 401) {
      window.location = `${config.portalUrl}/dashboard`;
      return Promise.reject("unauthorized");
    }
    if (response.ok) {
      return response.json();
    }
  })
  .then(data => {
    var planet = document.querySelector("#planet");
    var planetStyle = window.getComputedStyle(planet);
    document.querySelector("#planet-data h3").innerText = data.name;
    document.querySelector("#planet-data em").innerText = dictionnary.planet.type[data.type];
    planet.setAttribute('data-type', data.type);
    planet.style.top = `calc(50% - ${parseInt(planetStyle.height) / 2}px)`;
    planet.style.left = `calc(50% - ${parseInt(planetStyle.width) / 2}px)`;
    planet.style.display = "inline-block";
  }).catch(error => console.log(error))
;

window.onload = initPlanet;
