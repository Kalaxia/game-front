const getDensityVisualization = (density, picto) => Array((Math.ceil(density / 20) + 1)).join(picto);

const initPlanetResources = (list, data) => {
  for (key in data) {
    var resource = data[key];
    var info = document.createElement('li');
    info.innerHTML = `<em>${resource.name}</em> <strong>${getDensityVisualization(resource.density, resource.name)}</strong>`;
    list.appendChild(info);
  }
};
