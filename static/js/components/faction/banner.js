import { shadeColor } from '../../lib/colors.js';

export const renderFactionFlag = faction => {
    const flag = document.createElement('div');
    flag.classList.add('faction-flag');
    flag.innerHTML =
        `<header></header><section style="border: 3px solid ${shadeColor(faction.color, -0.2)}; border-bottom: 0px solid #000;
            background-color: ${faction.color};">
            <img src="/static/images/factions/${faction.banner}" />
            </section><footer style="border-top: 45px solid ${faction.color}"></footer>`
    ;
    return flag;
};
