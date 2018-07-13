import Dictionnary from '../../core/dictionnary.js';
import { renderFactionFlag } from './banner.js';

export const renderFactionRelations = faction => {
    const list = document.querySelector('#faction-relations > section');
    for (const relation of faction.relations) {
        const element = document.createElement('div');
        element.id = `relation-${relation.faction.id}`;
        element.classList.add('faction');
        element.innerHTML =
            `<header><h4 style="color: ${relation.faction.color}">${relation.faction.name}</h4><a href="/views/faction/index.html?id=${relation.faction.id}">${renderFactionFlag(relation.faction).outerHTML}</a></header>
            <section><p>${Dictionnary.translations.diplomacy.relations.indicators[relation.state]}</p></section>`
        ;
        list.appendChild(element);
    }
};
