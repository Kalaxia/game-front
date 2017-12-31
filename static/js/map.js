const mapScale = 50;
const minimapScale = 2;

getPlayer().then(() => {
  document.querySelector("#player-data h3").innerText = player.pseudo;
})

fetch('/api/map', {
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
  var map = document.querySelector("#map");
  var minimap = document.querySelector("#minimap");
  for (key in data.systems) {
    displaySystem(map, data.systems[key], mapScale);
    displaySystem(minimap, data.systems[key], minimapScale);
  }
}).catch(error => console.log(error));

const displaySystem = (map, data, scale) => {
  var system = document.createElement("div");
  system.classList.add('system');
  system.style.top = data.coord_y * scale + 'px';
  system.style.left = data.coord_x * scale + 'px';
  system.setAttribute('data-id', data.id);
  system.ondblclick = redirectToSystem;
  map.appendChild(system);
}

const startMapMove = e => {
  var map = document.querySelector("#map");
  // calculate event X, Y coordinates
  offsetX = e.clientX;
  offsetY = e.clientY;

  // assign default values for top and left properties
  if(!map.style.left) {
    map.style.left = '0px';
  }
  if (!map.style.top) {
    map.style.top = '0px';
  }

  // calculate integer values for top and left
  // properties
  coordX = parseInt(map.style.left);
  coordY = parseInt(map.style.top);
  drag = true;

  // move div element
  document.onmousemove = moveMap;
 }

const moveMap = e => {
   if (!drag) {
     return;
   }
   if (!e) {
     var e = window.event;
   }
   var map = document.querySelector("#map");
   // move div element
   map.style.left = coordX + e.clientX - offsetX + 'px';
   map.style.top = coordY + e.clientY - offsetY + 'px';
   return false;
 }

 const stopMapMove = () => {
     drag = false;
 }

 const redirectToSystem = event => {
   window.location = `/views/map/system.html?id=${event.currentTarget.getAttribute('data-id')}`;
 }

 window.onload = () => {
     document.onmousedown = startMapMove;
     document.onmouseup = stopMapMove;
 }
