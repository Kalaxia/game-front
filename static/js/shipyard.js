import Dictionnary from './core/dictionnary.js';
import Player from './model/player.js';
import Planet from './model/planet.js';
import Ship from './model/ship/ship.js';
import ShipModel from './model/ship/model.js';
import ShipModule from './model/ship/module.js';
import ShipFrame from './model/ship/frame.js';
import { displayPlanetStorage } from './components/planet/resources.js';

Player.fetchCurrentPlayer().then(player => {
  const profileLink = document.createElement('a');
  profileLink.href = '/views/profile';
  profileLink.innerText = player.pseudo;
  document.querySelector("#player-data h3").appendChild(profileLink);
});

let basePlanet;
const planetId = getCurrentPlanet();
const ship = new ShipModel({});

export const initShipyard = () => Promise.all([
    ShipModel.fetchPlayerModels().then(shipModels => {
        const list = document.querySelector('#ships-list > section');

        for (const model of shipModels) {
            addShipModel(list, model);
        }
    }),
    Planet.fetch(planetId).then(planet => {
        basePlanet = planet;
        displayPlanetStorage(planet);
    })
]);

export const displayShipModels = () => {
    document.querySelector('#ship-conception').style.display = 'none';
    document.querySelector('#ship-construction').style.display = 'none';
    document.querySelector('#ship-vizualizer').style.display = 'none';
    document.querySelector('#ship-data').style.display = 'none';
    document.querySelector('#modules').style.display = 'none';
    document.querySelector('#ships-list').style.display = 'block';
};

const addShipModel = (list, model) => {
    const element = document.createElement('div');
    const picture =
        (model.frame.picture !== '')
        ? `<img src="/static/images/shipyard/frame_${model.frame.picture}" />`
        : '#'
    ;
    element.classList.add('ship-model');
    element.classList.add(model.type);
    element.addEventListener('click', () => displayShipModel(model.id));
    element.innerHTML = `<header>${picture}</header><footer>${model.name}</footer>`;

    list.prepend(element);
};

const displayShipModel = modelId => ShipModel.fetch(modelId).then(model => {
    const shipConstructor = document.querySelector('#ship-construction');
    shipConstructor.style.display = 'block';
    document.querySelector('#ships-list').style.display = 'none';
    shipConstructor.querySelector(':scope > header > h1').innerHTML = `${model.name} <span>${Dictionnary.translations.ships.types[model.type]}</span>`;
    shipConstructor.querySelector(':scope > header > div > button').addEventListener('click', () => createShip(
        new Ship({ hangar: basePlanet, model: model }),
        document.querySelector('input[name="quantity"]').value
    ));
    shipConstructor.querySelector(':scope > section > header > div').innerHTML =
        `${model.slots.map(slot => {
            if (slot.module === '') {
                return '';
            }
            return renderShipModelModule(slot.module);
        }).join('')}`
    ;
    shipConstructor.querySelector(':scope > section > section > div:first-child > header > h3').innerText = model.frame.name;
    shipConstructor.querySelector(':scope > section > section > div:first-child > section').innerHTML =
        `<img src="/static/images/shipyard/frame_${model.frame.picture}" alt="${model.frame.name}"/>`
    ;
    displayShipStats(
        model,
        shipConstructor.querySelector(':scope > section > section > div:last-child > header > div'),
        shipConstructor.querySelector(':scope > section > section > div:last-child > section > div')
    );
});

const renderShipModelModule = module => {
    return `
        <div class="module"><header><h4>${Dictionnary.translations.ships.modules[module.slug].name}</h4></header>
        <section>
            ${Object.keys(module.ship_stats).map(key => {
                return `<div class="stat"><header>${Dictionnary.translations.ships.stats[key]}</header><section>${module.ship_stats[key]}</section></div>`
            }).join('')}
            ${Object.keys(module.stats).map(key => {
                return `<div class="stat"><header>${Dictionnary.translations.ships.stats[key]}</header><section>${module.stats[key]}</section></div>`
            }).join('')}
        </section>
        </div>`
    ;
};

const createShip = (ship, quantity) => ship.create(quantity).then(() => {
    displayShipModels();
});

export const createShipModel = () => {
    ship.name = document.querySelector('#ship-data > header > input').value;
    if (ship.name === '') {
        return alert(Dictionnary.translations.ships.missing_name);
    }
    ship.create().then(response => {
        addShipModel(document.querySelector('#ships-list > section'), ship)
        displayShipModels();
    }).catch(error => console.log(error));
};

export const displayFrames = () => {
    document.querySelector('#ship-conception').style.display = 'block';
    document.querySelector('#ship-vizualizer').style.display = 'none';
    document.querySelector('#ship-data').style.display = 'none';
    document.querySelector('#modules').style.display = 'none';
    document.querySelector('#ships-list').style.display = 'none';
    const container = document.querySelector('#frames');
    container.style.display = 'block';
    const list = container.querySelector('section');
    list.innerHTML = '';

    for (const frame of ShipFrame.getFrames()) {
        const element = document.createElement('div');
        const picture = (frame.picture !== '') ? `<img src="/static/images/shipyard/frame_${frame.picture}" />` : '#';
        element.classList.add('frame');
        element.setAttribute('data-frame-slug', frame.slug)
        element.addEventListener('click', chooseFrame);
        element.innerHTML = `<header>${picture}</header><footer>${frame.name}</footer>`
        list.append(element);
    }
};

const chooseFrame = event => {
    const frameElement = event.currentTarget;
    if (frameElement === null) {
        return;
    }
    const frame = ShipFrame.createFromSlug(frameElement.getAttribute('data-frame-slug'));
    document.querySelector('#frames').style.display = "none";
    const vizualizer = document.querySelector('#ship-vizualizer');
    vizualizer.style.display = 'block';
    vizualizer.querySelector('header > h3').innerText = frame.name;
    ship.frame = frame;
    ship.slots = Object.assign({}, frame.slots);
    displaySlots(frame);
    removeModuleData();

    document.querySelector('#ship-data').style.display = 'block';
    document.querySelector('#modules').style.display = 'flex';
    document.querySelector('#modules > section').innerHTML = '';
    document.querySelector('#ships-list').style.display = 'none';
    displayShipStats(
        ship,
        document.querySelector('#ship-stats'),
        document.querySelector('#ship-data > section > .list')
    );
};

const displaySlots = frame => {
    const vizualizer = document.querySelector('#ship-vizualizer > section');
    const picture = (frame.picture !== '') ? `<img src="/static/images/shipyard/frame_${frame.picture}" />` : '#';
    vizualizer.innerHTML = `<div id="ship-image">${picture}</div>`;

    for (const slotPosition in frame.slots) {
        const slot = frame.slots[slotPosition];
        const element = document.createElement('div');
        element.classList.add('slot');
        element.setAttribute('data-position', slot.position);
        element.setAttribute('data-size', slot.size);
        element.setAttribute('data-shape', slot.shape);
        element.addEventListener('click', displayModules);
        element.addEventListener('mouseenter', displaySlotModuleData);
        element.addEventListener('mouseleave', removeModuleData);

        for (const position of ['top', 'right', 'bottom', 'left']) {
            if (typeof slot[position] !== 'undefined') {
                element.style[position] = `${slot[position]}%`;
            }
        }
        vizualizer.append(element);
    }
};

const displayModules = event => {
    const slot = event.currentTarget;
    const previous = document.querySelector('.slot.selected');
    if (previous !== null) {
        previous.classList.remove('selected');
    }
    slot.classList.add('selected');
    const slotData = ship.slots[slot.getAttribute('data-position')];
    const list = document.querySelector('#modules > section');
    list.innerHTML = '';

    for (const module of ShipModule.getAll()) {
        if (module.shape !== slotData['shape'] || module.size !== slotData['size']) {
            continue;
        }
        const element = document.createElement('div');
        const picture = (module.picture !== '') ? `module_${module.type}_${module.size}_${module.picture}` : 'module.png';
        let transformScale = '';
        let transform = '';
        if (module.picture_flip_x === true) {
            transformScale += ' scaleX(-1)';
        }
        if (module.picture_flip_y === true) {
            transformScale += ' scaleY(-1)';
        }
        if (module.picture !== '' && transformScale !== '') {
            transform = `transform: ${transformScale}`;
        }
        element.classList.add('module', module.type);
        element.setAttribute('data-slug', module.slug);
        element.setAttribute('data-type', module.type);
        element.addEventListener('click', affectModule);
        element.addEventListener('mouseenter', () => { displayModuleData(module) });
        element.addEventListener('mouseleave', removeModuleData);
        element.innerHTML = `<div class="${module.shape}" style="background-image: url('/static/images/shipyard/${picture}');${transform}"></div>`;
        list.append(element);
    }
};

const affectModule = event => {
    const slot = document.querySelector('.slot.selected');
    const moduleElement = event.currentTarget;
    ship.slots[slot.getAttribute('data-position')].module = ShipModule.createFromSlug(moduleElement.getAttribute('data-slug'));

    displayShipStats(
        ship,
        document.querySelector('#ship-stats'),
        document.querySelector('#ship-data > section > .list')
    );

    const moduleStyle = window.getComputedStyle(moduleElement.querySelector('div'), null);
    slot.setAttribute('data-type', moduleElement.getAttribute('data-type'));

    slot.style.transform = moduleStyle.transform;
    slot.style.backgroundImage = moduleStyle.backgroundImage;
};

const displayShipStats = (ship, statsList, priceList) => {
    const stats = {};
    const prices = {};
    statsList.innerHTML = '';
    priceList.innerHTML = '';

    const addPrice = (prices, price) => {
        const key = (price.type !== 'resource') ? price.type : price.resource;
        if (typeof prices[key] !== 'undefined') {
            prices[key].amount += price.amount;
        } else {
            prices[key] = Object.assign({}, price);
            Object.setPrototypeOf(prices[key], price);
        }
    };

    for (const key in ship.frame.stats) {
        stats[key] = (typeof stats[key] !== 'undefined') ? stats[key] + ship.frame.stats[key] : ship.frame.stats[key];
    }
    for (const price of ship.frame.price) {
        addPrice(prices, price);
    }
    for (const id of Object.keys(ship.slots)) {
        const slot = ship.slots[id];
        if (slot.module === null || typeof slot.module.ship_stats === 'undefined') {
            continue;
        }
        for (const key in slot.module.ship_stats) {
            stats[key] = (typeof stats[key] !== 'undefined') ? stats[key] + slot.module.ship_stats[key] : slot.module.ship_stats[key];
        }
        for (const price of slot.module.price) {
            addPrice(prices, price);
        }
    }
    for (const key in stats) {
        const element = document.createElement('div');
        element.classList.add('stat');
        element.innerHTML = `<header>${Dictionnary.translations.ships.stats[key]}</header><section>${stats[key]}</section>`;
        statsList.append(element);
    }
    for (const key in prices) {
        displayPrice(priceList, prices[key]);
    }
};

const displaySlotModuleData = event => {
    let module = ship.slots[event.target.getAttribute('data-position')].module;
    if (module !== null) {
        displayModuleData(module);
    }
};

const displayModuleData = module => {
    const statsList = document.querySelector('#modules > footer');
    statsList.innerHTML = '';
    const priceList = document.querySelector('#modules > header > div');
    priceList.innerHTML = '';

    document.querySelector('#modules > header > h3').innerText = module.name;

    const addStat = (list, key, value) => {
        const element = document.createElement('div');
        element.classList.add('stat');
        element.innerHTML = `<header>${Dictionnary.translations.ships.stats[key]}</header><section>${value}</section>`;
        list.append(element);
    };
    for (const key in module.stats) {
        addStat(statsList, key, module.stats[key]);
    }
    for (const key in module.ship_stats) {
        addStat(statsList, key, module.ship_stats[key]);
    }
    for (const price of module.price) {
        displayPrice(priceList, price);
    }
};

const displayPrice = (list, price) => {
    const infos = price.getInfos();
    const element = document.createElement('div');
    element.classList.add('price');
    element.innerHTML = `<header>${infos.name}</header><section>${price.amount} <img src="/static/images/resources/${infos.picto}"/></section>`;
    list.append(element);
};

const removeModuleData = () => {
    document.querySelector('#modules > header > h3').innerText = '';
    document.querySelector('#modules > header > div').innerHTML = '';
    document.querySelector('#modules > footer').innerHTML = '';

    const slot = document.querySelector('.slot.selected');
    if (slot === null) {
        return;
    }
    const module = ship.slots[slot.getAttribute('data-position')].module
    if (module !== null) {
        displayModuleData(module);
    }
};
