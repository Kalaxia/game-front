import Api from './core/api.js';
import Player from './model/player.js';
import Planet from './model/planet.js';
import { renderFactionFlag } from './components/faction/banner.js';

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

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

      planetElement.appendChild(shape);
      planetElement.appendChild(planetName);
      list.appendChild(planetElement);
    }
  })
  .catch(error => console.log(error))
;

const setMyProfile = () => Player.fetchCurrentPlayer().then(displayProfile);

const setProfile = id => Player.fetchPlayer(id).then(displayProfile);

const displayProfile = profile => {
    //document.querySelector('.player-name').innerText = profile.pseudo;
    //const faction = document.querySelector('.faction-name > a');
    //faction.append(renderFactionFlag(profile.faction));
    //faction.append(profile.faction.name);
    getPlayerPlanets(profile);
};

window.addEventListener("load", () => {
    return (id !== null)
        ? setProfile(id)
        : setMyProfile()
    ;
});
