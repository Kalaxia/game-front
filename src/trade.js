import App from './core/app.js';
import ShipModel from  './model/ship/model.js';
import Faction from './model/faction.js';
import resourcesData from './resources/resources';
import planetsData from './resources/planets';
import Dictionnary from './core/dictionnary.js';
import { Offer, OPERATION_BUY, OPERATION_SELL, GOOD_TYPE_RESOURCES, GOOD_TYPE_SHIPS, GOOD_TYPE_MODELS } from './model/trade/offer.js';
import ResourceOffer from './model/trade/resource_offer.js';
import ModelOffer from './model/trade/model_offer.js';
import ShipOffer from './model/trade/ship_offer.js';
import { transformArray } from './transformers/offer.js';

export const initOffersList = () => Offer.fetchAll(OPERATION_SELL).then(transformArray).then(displayOffers);

const displayOffers = offers => {
    const list = document.querySelector('#offers-list > section > table > tbody');
    list.innerHTML = '';
    const planet = App.getCurrentPlanet();
    for (const offer of offers) {
        const row = document.createElement('tr');
        row.id = `offer-${offer.id}`;
        row.addEventListener('click', (event) => { showOfferDetails(event.currentTarget, offer); });
        row.innerHTML =
            `<td style="color:${offer.location.player.faction.color}">${offer.location.player.pseudo}</td>
            <td>${offer.getGoodName()}</td>
            <td><img src="${offer.getGoodPicto()}"/></td>
            <td>${offer.getGoodClass()}</td>
            <td>${offer.getQuantity()}</td>
            <td>${offer.getPrice()}</td>
            <td>${(planet.id !== offer.location.id) ? `${Number(planet.system.getDistanceFrom(offer.location.system)).toFixed(2)} Al` : '-'}</td>`
        ;
        list.appendChild(row);
    }
};

const showOfferDetails = (row, offer) => {
    const previous = document.querySelector('#offers-list > section > table > tbody > tr.selected');
    if (previous !== null) {
        if (previous === row) {
            return;
        }
        previous.classList.remove('selected');
    }
    row.classList.add('selected');
    const container = document.querySelector('#offer-details');
    container.style.visibility = 'visible';
    container.innerHTML =
        `<div id="offer-infos">
            <header>
                <div>
                    <img src="/static/images/picto/${planetsData[offer.location.type].picto}"/>
                    <em>${Dictionnary.translations.trade.planet}</em>
                    <strong>${offer.location.name}</strong>
                    <strong>[${offer.location.system.x}.${offer.location.system.y}]</strong>
                </div>
                <div>
                    <img src="/static/images/factions/${offer.location.player.faction.banner}"/>
                    <em>${Dictionnary.translations.trade.faction}</em>
                    <strong>${offer.location.player.faction.name}</strong>
                </div>
                <div>
                    <img src="/static/images/avatars/Hombre_v3t.png"/>
                    <em>${Dictionnary.translations.trade[((offer.operation === OPERATION_BUY) ? 'buyer' : 'seller')]}</em>
                    <strong>${(offer.location.player.id === App.getCurrentPlayer().id) ? Dictionnary.translations.trade.yourself : offer.location.player.pseudo}</strong>
                </div>
                <div>
                    <img src="/static/images/picto/G_P_Char_OL_64px.png"/>
                    <em>${Dictionnary.translations.trade.race}</em>
                    <strong>${Dictionnary.translations.races.human}</strong>
                </div>
            </header>
            <section>
                <div id="planets">
                    <div><img src="/static/images/picto/${planetsData[offer.location.type].image}"/></div>
                    <div>?</div>
                </div>
                <div id="travel-details">
                    <div class="travel-point"></div>
                    <img src="/static/images/picto/G_P_S2_64px.png"/>
                    <div class="travel-point"></div>
                </div>
                <div id="good-picto">
                    <img src="/static/images/picto/G_P_Lot_64px.png"/>
                </div>
            </section>
            <footer></footer>
        </div>
        <div id="good-infos">
            <header><h3>${Dictionnary.translations.trade.selected_offer}</h3></header>
            <section>
                <h4>${Dictionnary.translations.trade.types.resources}</h4>
                <div id="good-details">
                    <div id="good-type-picto">
                        <img src="/static/images/resources/${resourcesData[offer.resource].picto}"/>
                    </div>
                    <div id="operation-details">
                        <em>${Dictionnary.translations.trade.operation}</em>
                        <strong>${Dictionnary.translations.trade.operations[offer.operation]}</strong>
                        <em>${Dictionnary.translations.trade.types.resources}</em>
                        <strong>${Dictionnary.translations.resources[offer.resource]}</strong>
                    </div>
                </div>
                <div id="good-data">
                    <div id="offer-data">
                        <em>${Dictionnary.translations.trade.lot_contents}</em>
                        <strong>
                            ${offer.lotQuantity}
                            <img src="/static/images/resources/${resourcesData[offer.resource].picto}"/>
                        </strong>
                        <em>${Dictionnary.translations.trade.available_lots}</em>
                        <strong>
                            ${ offer.quantity / offer.lotQuantity }
                            <img src="/static/images/picto/G_P_Lot_64px.png"/>
                        </strong>
                        <em>${Dictionnary.translations.trade.lot_price}</em>
                        <strong>
                            ${ Number(offer.price * offer.lotQuantity).toFixed(2) }
                            <img src="/static/images/picto/G_P_Mon_64px.png"/>
                        </strong>
                        <em>${Dictionnary.translations.trade.unit_price}</em>
                        <strong>
                            ${ Number(offer.price).toFixed(2) }
                            <img src="/static/images/picto/G_P_Mon_64px.png"/>
                        </strong>
                    </div>
                    <div id="offer-actions">
                        ${((offer.location.player.id === App.getCurrentPlayer().id)
                            ? `<button onclick="cancelOffer(${offer.id});">
                                ${Dictionnary.translations.trade.cancel_offer}
                            </button>` : '') }
                    </div>
                </div>
            </section>
            <footer>${offer.createdAt.toLocaleDateString('fr-FR', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</footer>
        </div>`
    ;
};

export const cancelOffer = offerId => Offer.cancel(offerId).then(() => {
    document.querySelector(`#offer-${offerId}`).remove();
    const offerDetails = document.querySelector('#offer-details');
    offerDetails.style.visibility = 'hidden';
    offerDetails.innerHTML = '';
});

export const filterByOperation = event => {
    const previous = document.querySelector('#offer-filters #operation-selector .selected');
    if (previous !== null) {
        previous.classList.remove('selected');
    }
    event.currentTarget.classList.add('selected');
    return Offer.fetchAll(event.currentTarget.getAttribute('data-operation-type')).then(transformArray).then(displayOffers);
}

export const createOffer = () => {
    const operation = document.querySelector("#operation-selector > .selected").getAttribute('data-operation-type');
    const type = document.querySelector("#good-type-selector > .selected").getAttribute('data-choice-type');
    const planet = App.getCurrentPlanet();

    let offer;
    switch (type) {
        case GOOD_TYPE_RESOURCES:
            const resource = document.querySelector("#resource-selector .selected").getAttribute('data-resource');
            const quantity = document.querySelector("#quantity-input").value;
            const lotQuantity = document.querySelector("#lot-quantity-input").value;
            const price = document.querySelector("#price-input").value;
            offer = new ResourceOffer(null, operation, planet, new Date(), null, quantity, lotQuantity, price, resource);
            break;
        case GOOD_TYPE_SHIPS:
            offer = new ShipOffer();
            break;
        case GOOD_TYPE_MODELS:
            offer = new ModelOffer();
            break;
    }
    offer.create().then(() => { window.location.href = "/views/base/trade/dashboard.html" });
};

export const chooseType = type => {
    const previous = document.querySelector('#good-type-selector > div.selected');
    if (previous !== null) {
        if (previous.getAttribute('data-choice-type') === type) {
            return;
        }
        previous.classList.remove('selected');
    }
    document.querySelectorAll('#sell-form > section:first-child > section > form > section > div').forEach(element => {
        element.innerHTML = '';
    })
    document.querySelector(`#good-type-selector > div[data-choice-type="${type}"]`).classList.add('selected');
    switch(type) {
        case GOOD_TYPE_RESOURCES: initResourcesSaleForm(); break;
        case GOOD_TYPE_MODELS: initModelsSaleForm(); break;
        case GOOD_TYPE_SHIPS: initShipsSaleForm(); break;
    }
};

const initResourcesSaleForm = () => {
    const firstContainer = document.querySelector('#sell-form > section:first-child > section > form > section > div:first-child');
    const selectedResource = initResourceSelector(firstContainer);
    initResourceQuantity(firstContainer, selectedResource);
    initLotQuantity(firstContainer, selectedResource);
    initAuthorizedFactions(firstContainer);

    const secondContainer = document.querySelector('#sell-form > section:first-child > section > form > section > div:last-child');
    initResourceInfo(secondContainer, selectedResource);
    initPriceInput(secondContainer);
    initDiscountInput(secondContainer);
    initPriceGauge();
};

const updateResourcesSaleForm = resource => {
    const pictoPath = `/static/images/resources/${resourcesData[resource].picto}`;
    const storedQuantity = App.getCurrentPlanet().storage.resources[resource];

    document.querySelector('#resource-info h4').innerText = Dictionnary.translations.resources[resource];
    document.querySelector('#resource-info img').setAttribute('src', pictoPath);

    const quantityInput = document.querySelector('#quantity-input');
    quantityInput.setAttribute('max', storedQuantity);
    document.querySelector('#quantity-container img').setAttribute('src', pictoPath);
    document.querySelector('#quantity-container span').innerText = `(${Dictionnary.translations.trade.available_quantity.replace('%quantity%', storedQuantity)})`;

    const lotQuantityInput = document.querySelector('#lot-quantity-input');
    lotQuantityInput.setAttribute('max', storedQuantity);
    document.querySelector('#lot-container img').setAttribute('src', pictoPath);
    document.querySelector('#lot-container span').innerText =
        (quantityInput.value / lotQuantityInput.value >= 2)
        ? `(${Dictionnary.translations.trade.max_lots.replace('%nb_lots%', quantityInput.value / lotQuantityInput.value)})`
        : `(${Dictionnary.translations.trade.unique_available_lot})`;
};

const selectResource = element => {
    const previous = document.querySelector('#resource-selector .selected');
    if (previous !== null) {
        if (previous === element) {
            return;
        }
        previous.classList.remove('selected');
    }
    element.classList.add('selected');
    updateResourcesSaleForm(element.getAttribute('data-resource'));
}

const initResourceSelector = container => {
    const planet = App.getCurrentPlanet();
    const resourceSelector = document.createElement('div');
    resourceSelector.id = 'resource-selector';

    const resourceLabel = document.createElement('p');
    resourceLabel.innerText = `${Dictionnary.translations.planet.resources} :`;

    const resourceList = document.createElement('div');
    resourceList.classList.add('selector');

    let selectedResource = null;
    for (const resource in planet.storage.resources) {
        const data = resourcesData[resource];
        const amount = planet.storage.resources[resource];

        const element = document.createElement('div');
        element.setAttribute('data-resource', resource);
        element.addEventListener('click', event => { selectResource(event.currentTarget); });
        element.innerHTML = `<img src="/static/images/resources/${data['picto']}"/>`;
        if (selectedResource === null) {
            element.classList.add('selected');
            selectedResource = resource;
        }
        resourceList.appendChild(element);
    }
    resourceSelector.appendChild(resourceLabel);
    resourceSelector.appendChild(resourceList);
    container.appendChild(resourceSelector);
    return selectedResource;
};

const initResourceQuantity = (container, selectedResource) => {
    const planet = App.getCurrentPlanet();
    const storageQuantity = planet.storage.resources[selectedResource];
    const picto = resourcesData[selectedResource].picto;
    const quantityContainer = document.createElement('div');
    quantityContainer.id = 'quantity-container';
    quantityContainer.innerHTML =
        `<section>
            <p>${Dictionnary.translations.trade.quantity} :</p>
            <div>
                <input id="quantity-input"
                       type="number"
                       onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                       step="1"
                       min="1"
                       max="${storageQuantity}"
                       value="${storageQuantity}">
                <img src="/static/images/resources/${picto}"/>
            </div>
            <div><button type="button" onclick="document.querySelector('#quantity-input').value = ${storageQuantity};">${Dictionnary.translations.trade.max}</button></div>
        </section>
        <footer><span>(${Dictionnary.translations.trade.available_quantity.replace('%quantity%', storageQuantity)})</span></footer>`
    ;
    container.appendChild(quantityContainer);
};

const initLotQuantity = (container, selectedResource) => {
    const planet = App.getCurrentPlanet();
    const storageQuantity = planet.storage.resources[selectedResource];
    const picto = resourcesData[selectedResource].picto;
    const lotContainer = document.createElement('div');
    lotContainer.id = 'lot-container';
    lotContainer.innerHTML =
        `<section>
            <p>${Dictionnary.translations.trade.lot_quantity} :</p>
            <div>
                <input id="lot-quantity-input"
                       onchange="updateLotIndicator();"
                       onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                       type="number"
                       step="1"
                       min="1"
                       max="${storageQuantity}"
                       value="${storageQuantity}">
                <img src="/static/images/resources/${picto}"/>
            </div>
            <div>
                <button type="button" onclick="document.querySelector('#lot-quantity-input').value = 1;">${Dictionnary.translations.trade.min}</button>
                <button type="button" onclick="document.querySelector('#lot-quantity-input').value = ${storageQuantity};">${Dictionnary.translations.trade.max}</button>
            </div>
        </section>
        <footer><span>(${Dictionnary.translations.trade.unique_available_lot})</span></footer>`
    ;
    container.appendChild(lotContainer);
};

export const updateLotIndicator = () => {
    const quantity = document.querySelector('#quantity-input').value;

    const lotQuantityInput = document.querySelector('#lot-quantity-input');
    const lotQuantityIndicator = document.querySelector('#lot-container > footer > span');

    const nbLots = quantity / lotQuantityInput.value;

    if (!Number.isInteger(nbLots)) {
        lotQuantityInput.style.color = 'red';
        lotQuantityIndicator.innerText = `(${Dictionnary.translations.trade.invalid_lot_quantity})`;
    } else {
        lotQuantityInput.style.color = '#EFEFEF';
        lotQuantityIndicator.innerText = `(${Dictionnary.translations.trade.max_lots.replace('%nb_lots%', nbLots)})`;
    }
}

const initResourceInfo = (container, selectedResource) => {
    const picto = resourcesData[selectedResource].picto;

    const resourceInfo = document.createElement('div');
    resourceInfo.id = 'resource-info';
    resourceInfo.innerHTML =
        `<header><h4>${Dictionnary.translations.resources[selectedResource]}</h4></header>
        <section><img src="/static/images/resources/${picto}"/></section>`
    ;
    container.appendChild(resourceInfo);
};

const initAuthorizedFactions = container => Faction.fetchAll().then(factions => {
    const factionModule = document.createElement('div');
    factionModule.id = 'faction-module';
    // TODO: Implement unauthorized factions when war declaration will be available
    const authorizedFactions = [];
    const unauthorizedFactions = [];
    // This loop will check the relations with the player faction to determine if the faction is authorized or not
    for (const faction of factions) {
        authorizedFactions.push(faction);
    }

    initFactionContainer(factionModule, 'authorized-factions', authorizedFactions);
    initFactionContainer(factionModule, 'unauthorized-factions', unauthorizedFactions);

    container.appendChild(factionModule);
});

const initFactionContainer = (container, id, factions) => {
    const factionsContainer = document.createElement('div');
    factionsContainer.id = 'authorized-factions';
    factionsContainer.classList.add('faction-container');

    const containerLabel = document.createElement('p');
    containerLabel.innerText = `${Dictionnary.translations.trade[id.replace('-', '_')]} :`;

    factionsContainer.appendChild(containerLabel);

    const factionsList = document.createElement('div');

    for (const faction of factions) {
        const factionContainer = document.createElement('div');
        factionContainer.innerHTML = `<img src="/static/images/factions/${faction.banner}" alt="${faction.name}"/>`;

        factionsList.appendChild(factionContainer);
    }
    factionsContainer.appendChild(factionsList);
    container.appendChild(factionsContainer);
};

const initPriceInput = container => {
    const priceContainer = document.createElement('div');
    priceContainer.id = 'price-container';
    priceContainer.innerHTML =
        `<p>${Dictionnary.translations.trade.price} :</p>
        <div>
            <input id="price-input" type="number" min="0.01" value="1.0" step="0.01">

            <div>
                <sup><img src="/static/images/picto/G_P_Mon_64px.png"/></sup>
                <span>&frasl;</span>
                <sub>${Dictionnary.translations.trade.unit_short}</sub>
            </div>
        </div>`
    ;
    container.appendChild(priceContainer);
};

const initDiscountInput = container => {
    const discountContainer = document.createElement('div');
    discountContainer.id = 'discount-container';
    discountContainer.innerHTML =
        `<p>${Dictionnary.translations.trade.discount} :</p>
        <div>
            <input id="discount-input" type="number" min="0.01" value="1.0" step="0.01">

            <div>
                <sup><img src="/static/images/picto/G_P_Mon_64px.png"/></sup>
                <span>&frasl;</span>
                <sub>${Dictionnary.translations.trade.unit_short}</sub>
            </div>
        </div>`
    ;
    container.appendChild(discountContainer);
};

const initPriceGauge = () => {
    const container = document.querySelector('#sell-form > section > section > form > footer');
    const gauge = document.createElement('div');
    gauge.innerHTML =
        `<header>
            <div id="max-price-indicator"></div>
            <div id="discount-indicator"></div>
        </header>
        <section>
            <div id="price-gauge">
                <div id="discount-gauge">
                    <div id="max-price-gauge">
                        <span></span>
                    </div>
                    <span></span>
                </div>
            </div>
        </section>
        <footer>
            <div></div>
            <div></div>
            <div></div>
        </footer>`
    ;

    container.appendChild(gauge);
};

const initModelsSaleForm = () => ShipModel.fetchPlayerModels().then(models => {
    console.log(models);
});

const initShipsSaleForm = () => {

};
