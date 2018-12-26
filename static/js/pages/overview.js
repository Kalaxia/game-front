import App from '../core/app.js';
import Planet from '../model/planet.js';

import AppStyle from '../app-style';

import PlanetList from '../components/organisms/planet/list';
import TopMenu from '../components/organisms/menu/top';
import BottomMenu from '../components/organisms/menu/bottom';

import Vue from 'vue';
import { i18n } from '../lib/i18n';

const vm = new Vue({
    el: '#app',
    i18n,
    components: {
      PlanetList,
      TopMenu,
      BottomMenu
    },
    data: {
      planets: {},
      player: null,
      currentPlanet: null,
      appStyle: AppStyle
    }
});

App.init()
  .then(() => {
    vm.player = App.getCurrentPlayer();
    vm.currentPlanet = App.getCurrentPlanet();

    return Planet.fetchPlayerPlanets(vm.player)
  }).then(planets => { vm.planets = planets; })
;
