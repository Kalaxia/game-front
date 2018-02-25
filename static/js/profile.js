var searchParams = new URLSearchParams(window.location.search);
var id = searchParams.get('id');

const getPlayerProfile = id => fetch(`/api/players/${id}`, {
    method: 'GET',
    headers: headers
})

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

const setMyProfile = () => getCurrentPlayer().then(() => {
    document.querySelector('.player-name').innerText = player.pseudo;
    document.querySelector('.faction-name').innerText = player.faction.name;
    getPlayerPlanets(player);
});

const setProfile = id => fetch(`/api/players/${id}`, {
    method: 'GET',
    headers: headers
}).then(apiResponseMiddleware)
.then(profile => {
    document.querySelector('.player-name').innerText = profile.pseudo;
    document.querySelector('.faction-name').innerText = profile.faction.name;
    getPlayerPlanets(profile);
});

window.addEventListener("load", () => {
    return (id !== null)
        ? setProfile(id)
        : setMyProfile()
    ;
});
