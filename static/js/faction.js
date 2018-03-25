var searchParams = new URLSearchParams(window.location.search);
var id = searchParams.get('id');

const getFaction = id => fetch(`/api/factions/${id}`, {
    method: 'GET',
    headers: headers
})
.then(response => response.json())
.then(faction => {
    document.querySelector('.faction-name').append(faction.name);
    document.querySelector('.faction-flag').style.backgroundColor = faction.color;
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
            let memberElement = document.createElement("div");
            memberElement.classList.add('member');
            memberElement.innerHTML = `<a href="/views/profile/${ (member.id != player.id) ? `?id=${member.id}` : '' }">${member.pseudo}</a>`;

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
            `<header><a href="/views/faction/index.html?id=${relation.faction.id}" class="faction-flag" style="background-color: ${relation.faction.color}"></a></header>
            <section><h4>${relation.faction.name}</h4><p>${dictionnary.diplomacy.relations.indicators[relation.state]}</p></section>`
        ;
        list.appendChild(element);
    }
};

window.addEventListener("load", () => getCurrentPlayer().then(() => {
    let factionId = (id !== null) ? id : player.faction.id;
    getFaction(factionId);
    getFactionPlayers(factionId);
}));
