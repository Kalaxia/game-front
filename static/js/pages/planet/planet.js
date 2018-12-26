require('../../../less/pages/planet/planet.less');

import App from '../../core/app.js';

import AppStyle from '../../app-style';

import Planet from '../../model/planet';

import TopMenu from '../../components/organisms/menu/top';
import BottomMenu from '../../components/organisms/menu/bottom';

import PlanetData from '../../components/molecules/planet/data';
import PlanetShape from '../../components/atoms/planet/shape';
import PlanetBuildings from '../../components/molecules/planet/buildings';
import PlanetRelations from '../../components/molecules/planet/relations';
import PlanetResources from '../../components/molecules/planet/resources';

import Vue from 'vue';
import { i18n } from '../../lib/i18n';

const vm = new Vue({
    el: '#app',
    i18n,
    components: {
        PlanetData,
        PlanetShape,
        PlanetBuildings,
        PlanetRelations,
        PlanetResources,
        TopMenu,
        BottomMenu
    },
    data: {
        player: null,
        planet: null,
        currentPlanet: null,
        appStyle: AppStyle
    }
});

App.init()
  .then(() => {
    const urlParams = new URLSearchParams(window.location.search);

    vm.player = App.getCurrentPlayer();
    vm.currentPlanet = App.getCurrentPlanet();
    
    return Planet.fetch(urlParams.get('id'))
  }).then(planet => { vm.planet = planet; })
;