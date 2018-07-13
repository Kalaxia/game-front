export const renderFactionMembers = (list, members) => {
    for (const member of members) {
        const memberElement = document.createElement("a");
        memberElement.classList.add('member');
        memberElement.href = `/views/profile/${ (member.id !== player.id) ? `?id=${member.id}` : ''}`;
        memberElement.innerHTML =
            `<header><img src="/static/images/avatars/default.svg"/></header>
            <section><em>${member.pseudo}</em></section>`
        ;
        list.appendChild(memberElement);
    }
};
