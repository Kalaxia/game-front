

const getPlayerPlanets = player => fetch(`/api/players/${player.id}/planets`, {
  method: 'GET',
  headers: headers
}).then(apiResponseMiddleware)
  .then(data => {
    var list = document.querySelector('#planets > section');
    for (key in data) {
      var planetData = data[key];
      var shape = document.createElement('a');
      shape.classList.add('shape');
      shape.setAttribute('data-type', planetData.type);
      shape.href = `/views/map/planet.html?id=${planetData.id}`;

      var planetName = document.createElement('h3');
      planetName.innerText = planetData.name;

      var planet = document.createElement('div');
      planet.classList.add('planet');

      planet.appendChild(shape);
      planet.appendChild(planetName);
      list.appendChild(planet);
    }
  })
  .catch(error => console.log(error))
;

window.addEventListener("load", () => {
  getPlayer().then(() => {
    document.querySelector('.player-name').innerText = player.pseudo;
    getPlayerPlanets(player);
  });
});
