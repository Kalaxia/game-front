import Dictionnary from '/static/js/core/dictionnary.js';
import Faction from '/static/js/model/faction.js';
import Player from '/static/js/model/player.js';
import { renderFactionFlag } from './components/faction/banner.js';
import { renderFactionRelations } from './components/faction/relations.js';
import { renderFactionMembers } from './components/faction/members.js';

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

const renderFaction = faction => {
    const title = document.querySelector('#faction > #infos > h1');
    title.style.color = faction.color;
    title.append(renderFactionFlag(faction))
    title.append(faction.name);
};

window.addEventListener("load", () => Player.fetchCurrentPlayer().then(player => {
    const factionId = (id !== null) ? id : player.faction.id;
    Faction.fetch(factionId).then(faction => {
        renderFaction(faction);
        renderFactionRelations(faction);
        faction.fetchMembers().then(() => {
            renderFactionMembers(faction.members);
        });
    });
}));
