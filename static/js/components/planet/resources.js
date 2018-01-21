const getDensityVisualization = (density, picto) => Array((Math.ceil(density / 20) + 1)).join(picto);

const initPlanetResources = (list, data) => fetch('/config/resources.json', {cache: "no-store"})
  .then(response => response.json())
  .then(resourcesData => {
    for (key in data) {
      var resource = Object.assign(data[key], resourcesData[data[key].name]);
      var info = document.createElement('li');
      info.innerHTML =
        `<em>${resource.name}</em>
        <div class="density">${getDensityVisualization(
          resource.density,
          `<img src="/static/images/resources/${resource.picto}" alt="${resource.name}"/>`
        )}</div>`
      ;
      list.appendChild(info);
    }
  })
;
