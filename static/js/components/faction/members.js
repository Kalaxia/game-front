import App from '../../core/app.js';

export const renderFactionMembers = members => {
    const player = App.getCurrentPlayer();
    const list = document.querySelector("#members > section");
    for (const member of members) {
        const memberElement = document.createElement("a");
        memberElement.classList.add('member');
        memberElement.href = `/views/profile/${ (member.id !== player.id) ? `?id=${member.id}` : ''}`;
        memberElement.innerHTML =
            `<header><img src="/static/images/avatars/Hombre_v3t.png"/></header>
            <section><em>${member.pseudo}</em></section>`
        ;
        list.appendChild(memberElement);
    }
};
