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

window.addEventListener("load", () => {
    getCurrentPlayer().then(() => {
        document.querySelector('.faction-name').append(player.faction.name);
        document.querySelector('.faction-flag').style.backgroundColor = player.faction.color;
        getFactionPlayers(player.faction.id);
    });
});
