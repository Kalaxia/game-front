var searchParams = new URLSearchParams(window.location.search);
var id = searchParams.get('id');

const getFaction = id => fetch(`/api/factions/${id}`, {
    method: 'GET',
    headers: headers
})
.then(response => response.json())
.then(faction => {
    const title = document.querySelector('#faction > #infos > h1');
    title.style.color = faction.color;
    title.append(renderFactionFlag(faction))
    title.append(faction.name);
    renderFactionRelations(faction);
});

const getFactionPlayers = id => fetch(`/api/factions/${id}/members`, {
        method: 'GET',
        headers: headers
    })
    .then(response => response.json())
    .then(members => {
        var list = document.querySelector("#members > section");
        for (member of members) {
            let memberElement = document.createElement("a");
            memberElement.classList.add('member');
            memberElement.href = `/views/profile/${ (member.id !== player.id) ? `?id=${member.id}` : ''}`;
            memberElement.innerHTML =
                `<header><img src="/static/images/avatars/default.svg"/></header>
                <section><em>${member.pseudo}</em></section>`
            ;
            list.appendChild(memberElement);
        }
    })
;

const renderFactionRelations = faction => {
    let list = document.querySelector('#faction-relations > section');
    for (relation of faction.relations) {
        let element = document.createElement('div');
        element.id = `relation-${relation.faction.id}`;
        element.classList.add('faction');
        element.innerHTML =
            `<header><h4 style="color: ${relation.faction.color}">${relation.faction.name}</h4><a href="/views/faction/index.html?id=${relation.faction.id}">${renderFactionFlag(relation.faction).outerHTML}</a></header>
            <section><p>${dictionnary.diplomacy.relations.indicators[relation.state]}</p></section>`
        ;
        list.appendChild(element);
    }
};

window.addEventListener("load", () => getCurrentPlayer().then(() => {
    let factionId = (id !== null) ? id : player.faction.id;
    getFaction(factionId);
    getFactionPlayers(factionId);
}));
