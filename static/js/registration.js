import Api from './core/api.js';
import Faction from './model/faction.js';
import Player from './model/player.js';
import Planet from './model/planet.js';
import { initPlanetResources } from './components/planet/resources.js';
//import { initPlanetRelations } from './components/planet/relations.js';
import Dictionnary from './core/dictionnary.js';

const getFactions = () => Faction.fetchAll().then(factions => {

    const list = document.querySelector("#factions");
    const descriptions  = document.querySelector("#descriptions");

    for (const faction of factions) {
        const factionElement = document.createElement('div');
        factionElement.classList.add('faction');
        factionElement.innerText = faction.name;
        factionElement.onclick = selectFaction;
        factionElement.setAttribute('data-id', faction.id);
        list.appendChild(factionElement);

        const description = document.createElement('div');
        description.id = `description-${faction.id}`;
        description.classList.add('description');
        description.innerText = faction.description;
        descriptions.appendChild(description);
    }
});

const selectFaction = event => {
  var previous = document.querySelector('.faction.selected');
  if(previous !== null) {
    previous.classList.remove('selected');
    document.querySelector(`#description-${previous.getAttribute('data-id')}`).classList.remove('active');
  }
  event.currentTarget.classList.add('selected');
  document.querySelector(`#description-${event.currentTarget.getAttribute('data-id')}`).classList.add('active');
};

export const nextStep = () => {
  var faction = document.querySelector('.faction.selected');
  if (faction === null) {
    return false;
  }
  sessionStorage.setItem('registration.faction', faction.getAttribute('data-id'));
  window.location = '/views/register/planet.html';
};

const getPlanets = () => Planet.fetchFactionChoicesPlanets(sessionStorage.getItem('registration.faction')).then(planets => {
    var list = document.querySelector("#planets");
    var descriptionsList = document.querySelector("#descriptions");
    for (const planet of planets) {
      var planetElement = document.createElement('div');
      planetElement.classList.add('shape');
      planetElement.setAttribute('data-type', planet.type);
      planetElement.setAttribute('data-id', planet.id);
      planetElement.onclick = selectPlanet;
      list.appendChild(planetElement);

      var description = document.createElement('div');
      description.id = `description-${planet.id}`;
      description.classList.add('description');
      description.innerHTML =
        `<header><h3>${planet.name}</h3></header>
        <section>
          <div class="relations">
            <h4>${Dictionnary.translations.planet.relations}</h4>
            <div class="canvas-holder" style="width:100%">
              <canvas class="chart-area" width="500" height="500" />
            </div>
          </div>
          <div class="resources"><h4>${Dictionnary.translations.planet.resources}</h4><ul></ul></div>
        </section>`
      ;
      descriptionsList.appendChild(description);
      initPlanetResources(
        document.querySelector(`#description-${planet.id} > section > .resources > ul`),
        planet.resources
      );
      // initPlanetRelations(
      //   document.querySelector(`#description-${planet.id} > section > .relations`),
      //   planet.relations
      // );
    }
  })
;

export const selectPlanet = event => {
  var previous = document.querySelector('.shape.selected');
  if(previous !== null) {
    previous.classList.remove('selected');
    document.querySelector(`#description-${previous.getAttribute('data-id')}`).classList.remove('active');
  }
  event.currentTarget.classList.add('selected');
  document.querySelector(`#description-${event.currentTarget.getAttribute('data-id')}`).classList.add('active');
};

export const validate = () => {
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
      headers: Api.headers
  })
  .then(response => {
    if (response.ok) {
      window.location = `/views/map/planet.html?id=${planetId}`;
      return;
    }
    return Promise.reject(response.text());
  }).catch(error => console.log(error));
};

window.addEventListener("load", () => Player.fetchCurrentPlayer().then(player => {
    if (player.is_active == true) {
      window.location = "/views/profile";
    }
    if (document.querySelector('#registration-step').value === 'factions') {
      getFactions();
    } else {
      getPlanets();
    }
}));
