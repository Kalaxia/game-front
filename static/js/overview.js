import Api from './core/api.js';
import App from './core/app.js';
import Player from './model/player.js';
import Planet from './model/planet.js';

const getPlayerPlanets = player => Planet.fetchPlayerPlanets(player.id).then(planets => {
    const list = document.querySelector('#planets > section');
    for (const planet of planets) {
      const shape = document.createElement('a');
      shape.classList.add('shape');
      shape.setAttribute('data-type', planet.type);
      shape.href = `/views/map/planet.html?id=${planet.id}`;

      const planetName = document.createElement('h3');
      planetName.innerText = planet.name;

      const planetElement = document.createElement('div');
      planetElement.classList.add('planet');

      const planetResourceLink = document.createElement('a');
      planetResourceLink.innerText = "Production détaillée TOTRAD"
      planetResourceLink.href = `/views/base/production.html`;

      planetElement.appendChild(planetResourceLink);
      planetElement.appendChild(shape);
      planetElement.appendChild(planetName);
      list.appendChild(planetElement);
    }
  })
  .catch(error => console.log(error))
;

App.init().then(() => {
    getPlayerPlanets(App.getCurrentPlayer());
});
