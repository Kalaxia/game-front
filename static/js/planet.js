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

    initPlanetResources(data.resources);
  }).catch(error => console.log(error))
;

const initPlanetResources = data => {
  var list = document.querySelector("#planet-data ul");
  for (key in data) {
    var resource = data[key];
    var info = document.createElement('li');
    info.innerHTML = `<em>${resource.name}</em> <strong>${getDensityVisualization(resource.density, resource.name)}</strong> <span>( +${resource.density * 1000} )</span>`;
    list.appendChild(info);
  }
};

const getDensityVisualization = (density, picto) => Array((Math.ceil(density / 20) + 1)).join(picto);

window.onload = initPlanet;
