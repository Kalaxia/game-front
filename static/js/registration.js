const getFactions = () => fetch('/api/factions', {
      method: 'GET',
      headers: headers
  })
  .then(apiResponseMiddleware)
  .then(data => {
    var list = document.querySelector("#factions");
    var descriptions  = document.querySelector("#descriptions");

    for (key in data) {
      var faction = document.createElement('div');
      faction.classList.add('faction');
      faction.innerText = data[key].name;
      faction.onclick = selectFaction;
      faction.setAttribute('data-id', data[key].id);
      list.appendChild(faction);

      var description = document.createElement('div');
      description.id = `description-${data[key].id}`;
      description.classList.add('description');
      description.innerText = data[key].description;
      descriptions.appendChild(description);
    }
  }).catch(error => console.log(error))
;

const selectFaction = event => {
  var previous = document.querySelector('.faction.selected');
  if(previous !== null) {
    previous.classList.remove('selected');
    document.querySelector(`#description-${previous.getAttribute('data-id')}`).classList.remove('active');
  }
  event.currentTarget.classList.add('selected');
  document.querySelector(`#description-${event.currentTarget.getAttribute('data-id')}`).classList.add('active');
};

const nextStep = () => {
  var faction = document.querySelector('.faction.selected');
  if (faction === null) {
    return false;
  }
  sessionStorage.setItem('registration.faction', faction.getAttribute('data-id'));
  window.location = '/views/register/planet.html';
};

const getPlanets = () => fetch(`/api/factions/${sessionStorage.getItem('registration.faction')}/planet-choices`, {
      method: 'GET',
      headers: headers
  })
  .then(apiResponseMiddleware)
  .then(data => {
    var list = document.querySelector("#planets");
    var descriptionsList = document.querySelector("#descriptions");
    for (key in data) {
      var planetData = data[key];
      var planet = document.createElement('div');
      planet.classList.add('shape');
      planet.setAttribute('data-type', planetData.type);
      planet.setAttribute('data-id', planetData.id);
      planet.onclick = selectPlanet;
      list.appendChild(planet);

      var description = document.createElement('div');
      description.id = `description-${planetData.id}`;
      description.classList.add('description');
      description.innerHTML =
        `<header><h3>${planetData.name}</h3></header>
        <section><div class="resources"><ul></ul></div></section>`
      ;
      descriptionsList.appendChild(description);
      initPlanetResources(
        document.querySelector(`#description-${planetData.id} > section > .resources > ul`),
        planetData.resources
      );
    }
  }).catch(error => console.log(error))
;

const selectPlanet = event => {
  var previous = document.querySelector('.shape.selected');
  if(previous !== null) {
    previous.classList.remove('selected');
    document.querySelector(`#description-${previous.getAttribute('data-id')}`).classList.remove('active');
  }
  event.currentTarget.classList.add('selected');
  document.querySelector(`#description-${event.currentTarget.getAttribute('data-id')}`).classList.add('active');
};

const validate = () => {
  var planet = document.querySelector('.shape.selected');
  if (planet === null) {
    return false;
  }
  var planetId = planet.getAttribute('data-id');
  fetch('/api/players', {
      method: 'POST',
      body: JSON.stringify({
          faction_id: sessionStorage.getItem('registration.faction'),
          planet_id: planetId
      }),
      headers: headers
  })
  .then(response => {
    if (response.ok) {
      window.location = `/views/map/planet.html?id=${planetId}`;
      return;
    }
    return Promise.reject(response.text());
  }).catch(error => console.log(error));
};

window.addEventListener("load", () => {
  if (document.querySelector('#registration-step').value === 'factions') {
    getFactions();
  } else {
    getPlanets();
  }
});
