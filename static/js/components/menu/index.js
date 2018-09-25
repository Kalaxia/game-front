import Dictionnary from '../../core/dictionnary.js';
import Player from '../../model/player.js';
import App from '../../core/app.js';
import { getResourceData } from '../planet/resources.js';

const initMenu = () => {
    const player = App.getCurrentPlayer();
    const planet = App.getCurrentPlanet();

    initTopMenu(player, planet);
    initLeftMenu(player, planet);
    initRightMenu(player);
};

const initTopMenu = (player, planet) => {
    const menu = document.createElement('div');
    menu.id = 'top-menu';
    menu.innerHTML = `
        <a href="#" class="not-implemented">
            <img src="/static/images/picto/G_P_Mon_64px.png" />
            <img class="outline" src="/static/images/picto/G_P_Mon_Outline_64px.png" />
            <span>${Dictionnary.translations.menu.finances}</span>
        </a>
        <a href="/views/fleet/fleet-all.html">
            <img src="/static/images/picto/G_P_Def_64px.png" />
            <img class="outline" src="/static/images/picto/G_P_Def_Outline_64px.png" />
            <span>${Dictionnary.translations.menu.fleets}</span>
        </a>
        <a href="#" class="not-implemented">
            <img src="/static/images/picto/G_P_Science_64px.png" />
            <img class="outline" src="/static/images/picto/G_P_Science_Outline_64px.png" />
            <span>${Dictionnary.translations.menu.technologies}</span>
        </a>
        <a href="/views/overview">
            <img src="/static/images/picto/G_P_Ov_64px.png" />
            <img class="outline" src="/static/images/picto/G_P_Ov_Outline_64px.png" />
            <span>${Dictionnary.translations.menu.overview}</span>
        </a>
        <a href="/views/map">
            <img src="/static/images/picto/G_P_Map_64px.png" />
            <img class="outline" src="/static/images/picto/G_P_Map_Outline_64px.png" />
            <span>${Dictionnary.translations.menu.map}</span>
        </a>
        <a href="/views/profile">
            <img src="/static/images/picto/G_P_Rank_64px.png" />
            <img class="outline" src="/static/images/picto/G_P_Rank_Outline_64px.png" />
            <span>${Dictionnary.translations.menu.profile}</span>
        </a>
        <section>
            <header>
                <a href="/views/faction">
                    <img src="/static/images/factions/${player.faction.banner}"/>
                </a>
            </header>
            <section>
                <a href="/views/base/fleet-base.html">
                    <img src="/static/images/picto/G_P_Def_64px_BK.png" />
                </a>
                <a href="/views/map/planet.html?id=${planet.id}">
                    <img src="/static/images/picto/G_P_Pl_64px.png" />
                </a>
                <a href="#" class="not-implemented">
                    <img src="/static/images/picto/G_P_Stat_64px.png" />
                </a>
            </section>
        </section>
    `;
    const logout = document.createElement('a');
    logout.addEventListener('click', Player.logout);
    logout.id = 'logout';
    logout.href = '#';
    logout.innerHTML = `<img src="/static/images/picto/G_P_Logout_64px.png"/>`;
    document.body.appendChild(logout);
    document.body.appendChild(menu);
};

const initLeftMenu = (player, planet) => {
    const menu = document.createElement('div');
    menu.id = 'left-menu';
    menu.innerHTML=  `
        <header class="side-menu">
            <div>
                <div>
                    <img src="/static/images/picto/G_P_Mon_64px.png" />
                </div>
                <span>${player.wallet}</span>
            </div>
            <div>
                <div>
                </div>
                <span>0</span>
            </div>
            <div>
                <div>
                </div>
                <span>0</span>
            </div>
        </header>
        <section>
            <div>
                <div>
                    <img src="/static/images/avatars/Hombre_v3t.png"/>
                </div>
                <span>${player.pseudo}</span>
            </div>
        </section>
        <footer class="side-menu">
            ${Object.keys(planet.storage.resources).map(resource => {
                return `<div>
                    <div>
                        <img src="/static/images/resources/${getResourceData(resource).picto}" />
                    </div>
                    <span>${planet.storage.resources[resource]}</span>
                </div>`;
            }).join('')}
        </footer>
    `;
    document.body.appendChild(menu);
};

const initRightMenu = player => {
    const menu = document.createElement('div');
    menu.id = 'right-menu';
    menu.innerHTML = `
        <header class="side-menu">
            <div>
                <div>
                </div>
                <span>0</span>
            </div>
            <div>
                <div>
                </div>
                <span>0</span>
            </div>
            <div>
                <div>
                </div>
                <span>0</span>
            </div>
        </header>
        <section>
            <a href="/views/faction">
                <img src="/static/images/factions/${player.faction.banner}"/>
            </a>
        </section>
        <footer class="side-menu">
            <div>
                <div>
                </div>
                <span>0</span>
            </div>
            <div>
                <div>
                </div>
                <span>0</span>
            </div>
            <div>
                <div>
                </div>
                <span>0</span>
            </div>
        </footer>
    `;
    document.body.appendChild(menu);
};

export default initMenu;
