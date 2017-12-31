const getFactions = () => {
  fetch('/api/factions', {
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
  }).catch(error => console.log(error));
};

const selectFaction = event => {
  var previous = document.querySelector('.faction.selected');
  if(previous !== null) {
    previous.classList.remove('selected');
    document.querySelector(`#description-${previous.getAttribute('data-id')}`).classList.remove('active');
  }
  event.currentTarget.classList.add('selected');
  document.querySelector(`#description-${event.currentTarget.getAttribute('data-id')}`).classList.add('active');
}

const nextStep = () => {
  var faction = document.querySelector('.faction.selected');
  if (faction === null) {
    return false;
  }
  sessionStorage.setItem('registration.faction', faction.getAttribute('data-id'));
  window.location = '/views/register/planet.html';
}

window.onload = getFactions;
