getCurrentPlayer().then(() => {
  var profileLink = document.createElement('a');
  profileLink.href = '/views/profile';
  profileLink.innerText = player.pseudo;
  document.querySelector("#player-data h3").appendChild(profileLink);
});

var planetId = getCurrentPlanet();
var ship = {};

const initShipyard = () => {
    let list = document.querySelector('#ships-list > section');

    for (let ship of shipsMock) {
        let element = document.createElement('div');
        element.classList.add('ship');
        element.innerHTML = `<header>#</header><footer>${ship.name}</footer>`;

        list.append(element);
    }
};

const displayFrames = () => {
    document.querySelector('#ship-vizualizer').style.display = 'none';
    let container = document.querySelector('#frames');
    container.style.display = 'block';
    let list = container.querySelector('section');
    list.innerHTML = '';

    for (let index in framesMock) {
        let frame = framesMock[index];
        let element = document.createElement('div');
        element.classList.add('frame');
        element.setAttribute('data-frame-index', index)
        element.addEventListener('click', chooseFrame);
        element.innerHTML = `<header>#</header><footer>${frame.name}</footer>`
        list.append(element);
    }
};

const chooseFrame = event => {
    let frameElement = event.currentTarget;
    if (frameElement === null) {
        return;
    }
    let frame = framesMock[frameElement.getAttribute('data-frame-index')];
    document.querySelector('#frames').style.display = "none";
    let vizualizer = document.querySelector('#ship-vizualizer');
    vizualizer.style.display = 'block';
    vizualizer.querySelector('header > h3').innerText = frame.name;
    ship = { frame: frame, slots: {} };
    displaySlots(frame);

    let stats = document.querySelector('#ship-stats');
    stats.style.display = 'block';
    displayStats();
};

const displaySlots = frame => {
    let vizualizer = document.querySelector('#ship-vizualizer > section');
    vizualizer.innerHTML = '<div id="ship-image">#</div>';

    for (slot of frame.slots) {
        let element = document.createElement('div');
        element.classList.add('slot');
        element.setAttribute('data-id', slot.id);
        element.setAttribute('data-size', slot.size);
        element.setAttribute('data-shape', slot.shape);
        element.addEventListener('click', displayModules);

        ship.slots[slot.id] = {
            shape: slot.shape,
            size: slot.size,
            module: null,
        };

        for (position of ['top', 'right', 'bottom', 'left']) {
            if (typeof slot[position] !== 'undefined') {
                element.style[position] = `${slot[position]}px`;
            }
        }
        vizualizer.append(element);
    }
};

const displayModules = event => {
    let slot = event.currentTarget;
    let previous = document.querySelector('.slot.selected');
    if (previous !== null) {
        previous.classList.remove('selected');
    }
    slot.classList.add('selected');
    let slotData = ship.slots[slot.getAttribute('data-id')];
    let list = document.querySelector('#ship-vizualizer > footer');
    list.innerHTML = '';

    for (let index in modulesMock) {
        let module = modulesMock[index];
        if (module.shape !== slotData['shape'] || module.size !== slotData['size']) {
            continue;
        }
        let element = document.createElement('div');
        element.classList.add('module', module.type);
        element.setAttribute('data-index', index);
        element.setAttribute('data-type', module.type);
        element.addEventListener('click', affectModule);
        element.innerHTML = `<div class="${module.shape}"></div>`;
        list.append(element);
    }
};

const affectModule = event => {
    let slot = document.querySelector('.slot.selected');
    let moduleElement = event.currentTarget;
    let module = modulesMock[moduleElement.getAttribute('data-index')];
    ship.slots[slot.getAttribute('data-id')].module = module;

    displayStats();

    slot.setAttribute('data-type', moduleElement.getAttribute('data-type'));
    slot.style.backgroundImage = window.getComputedStyle(moduleElement.querySelector('div'), null).backgroundImage;
};

const displayStats = () => {
    displayGlobalStats();
    displayModuleStats();
};

const displayGlobalStats = () => {
    let stats = {};
    let statsList = document.querySelector('#ship-stats > section > .list');
    statsList.innerHTML = '';

    for (let key in ship.frame.stats) {
        stats[key] = (typeof stats[key] !== 'undefined') ? stats[key] + ship.frame.stats[key] : ship.frame.stats[key];
    }
    for (let id of Object.keys(ship.slots)) {
        let slot = ship.slots[id];
        if (slot.module === null || typeof slot.module.ship_stats === 'undefined') {
            continue;
        }
        for (let key in slot.module.ship_stats) {
            stats[key] = (typeof stats[key] !== 'undefined') ? stats[key] + slot.module.ship_stats[key] : slot.module.ship_stats[key];
        }
    }
    for (let key in stats) {
        let element = document.createElement('div');
        element.classList.add('stat');
        element.innerHTML = `<header>${key}</header><section>${stats[key]}</section>`;
        statsList.append(element);
    }
};

const displayModuleStats = () => {
    let stats = {};
    let statsList = document.querySelector('#ship-stats > footer > .list');
    statsList.innerHTML = '';

    for (let id of Object.keys(ship.slots)) {
        let slot = ship.slots[id];
        if (slot.module === null) {
            continue;
        }
        for (let key in slot.module.stats) {
            stats[key] = (typeof stats[key] !== 'undefined') ? stats[key] + slot.module.stats[key] : slot.module.stats[key];
        }
    }
    for (let stat of Object.keys(stats)) {
        let element = document.createElement('div');
        element.classList.add('stat');
        element.innerHTML = `<header>${stat}</header><section>${stats[stat]}</section>`;
        statsList.append(element);
    }
};

var framesMock = [
    {
        "id": 1,
        "name": "Châssis léger",
        "slug": "chassis-leger",
        "picture": "",
        "slots": [
            {
                "id": 1,
                "top": 100,
                "left": 100,
                "shape": "square",
                "size": "small",
            },
            {
                "id": 2,
                "bottom": 250,
                "right": 100,
                "shape": "square",
                "size": "medium",
            },
            {
                "id": 3,
                "bottom": 100,
                "right": 150,
                "shape": "square",
                "size": "small",
            },
        ],
        "stats": {
            "armor": 45,
        }
    },
    {
        "id": 2,
        "name": "Châssis renforcé",
        "slug": "chassis-renforce",
        "picture": "",
        "slots": [
            {
                "id": 1,
                "top": 100,
                "left": 100,
                "shape": "square",
                "size": "small",
            },
            {
                "id": 2,
                "bottom": 100,
                "right": 100,
                "shape": "circle",
                "size": "small",
            },
            {
                "id": 3,
                "bottom": 150,
                "right": 100,
                "shape": "square",
                "size": "medium",
            },
        ],
        "stats": {
            "armor": 60
        }
    },
    {
        "id": 3,
        "name": "Châssis polymère",
        "slug": "chassis-polymere",
        "picture": "",
        "slots": [
            {
                "id": 1,
                "top": 100,
                "left": 100,
                "shape": "square",
                "size": "medium",
            },
            {
                "id": 2,
                "bottom": 100,
                "left": 200,
                "shape": "rectangle",
                "size": "medium",
            },
            {
                "id": 3,
                "bottom": 100,
                "left": 300,
                "shape": "rectangle",
                "size": "medium",
            },
            {
                "id": 4,
                "bottom": 100,
                "right": 100,
                "shape": "square",
                "size": "medium",
            },
            {
                "id": 5,
                "bottom": 150,
                "right": 100,
                "shape": "square",
                "size": "medium",
            },
        ],
        "stats": {
            "armor": 80
        }
    },
];

var modulesMock = [
    {
        "id": 1,
        "name": "Mitrailleuse laser",
        "slug": "mitrailleuse-laser",
        "description": "Arme fixe à forte cadence, idéale pour un vaisseau rapide",
        "type": "weapon",
        "shape": "square",
        "size": "small",
        "scores": {
            "fighter": 50,
            "bomber": 20,
        },
        "stats": {
            "nb_shots": 8,
            "damage": 10,
            "precision": 25
        }
    },
    {
        "id": 2,
        "name": "Réacteur principal Treigar",
        "slug": "reacteur-principal-treigar",
        "description": "Réacteur de petite taille avec une bonne puissance",
        "type": "engine",
        "shape": "square",
        "size": "medium",
        "scores": {
            "fighter": 25,
            "bomber": 20,
            "freighter": 25
        },
        "ship_stats": {
            "speed": 225,
        }
    },
    {
        "id": 3,
        "name": "Réacteur auxiliaire Mark I",
        "slug": "reacteur-auxiliaire-mark-i",
        "description": "Réacteur léger ajoutant un peu de vitesse",
        "type": "engine",
        "shape": "square",
        "size": "small",
        "scores": {
            "fighter": 40,
            "bomber": 35,
            "freighter": 20
        },
        "ship_stats": {
            "speed": 115,
        }
    },
    {
        "id": 4,
        "name": "Tourelle laser Meirrion",
        "slug": "tourelle-laser-meirrion",
        "description": "Tourelle mobile composée de deux canons laser parallèles",
        "type": "weapon",
        "shape": "circle",
        "size": "small",
        "scores": {
            "fighter": 40,
            "bomber": 35,
            "freighter": 20
        },
        "stats": {
            "nb_shots": 4,
            "damage": 25,
            "precision": 60,
        }
    },
    {
        "id": 5,
        "name": "Générateur de bouclier léger",
        "slug": "generateur-de-bouclier-leger",
        "description": "Réacteur léger ajoutant un peu de vitesse",
        "type": "shield",
        "shape": "rectangle",
        "size": "medium",
        "scores": {
            "fighter": 10,
            "bomber": 15,
            "freighter": 25,
            "corvette": 35,
            "frigate": 25
        },
        "ship_stats": {
            "power": 75,
        }
    },
    {
        "id": 6,
        "name": "Coffre de toit",
        "slug": "coffre-de-toit",
        "description": "Soute de taille moyenne pour du cargo",
        "type": "cargo",
        "shape": "rectangle",
        "size": "medium",
        "scores": {
            "freighter": 60
        },
        "ship_stats": {
            "size": 500,
        }
    },
];

var shipsMock = [
    {
        "id": 1,
        "name": "Tartempion I",
        "slug": "tartempion-i",
        "type": "cargo",
        "frame": "chassis-renforce",
    },
    {
        "id": 2,
        "name": "Tartempion II",
        "slug": "tartempion-ii",
        "type": "destroyer",
        "frame": "chassis-polymere",
    },
    {
        "id": 3,
        "name": "Tartempion III",
        "slug": "tartempion-iii",
        "type": "cargo",
        "frame": "chassis-polymere",
    }
];
