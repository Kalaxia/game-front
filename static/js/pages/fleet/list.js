require('../../../less/pages/fleet/list.less');

import App from '../../core/app.js';
import Fleet from '../../model/fleet.js';

import AppStyle from '../../app-style';

import FleetsList from '../../components/organisms/fleet/list';
import TopMenu from '../../components/organisms/menu/top';
import BottomMenu from '../../components/organisms/menu/bottom';

import Vue from 'vue';
import { i18n } from '../../lib/i18n';

const vm = new Vue({
    el: '#app',
    i18n,
    components: {
      FleetsList,
      TopMenu,
      BottomMenu
    },
    data: {
      fleets: {},
      player: null,
      currentPlanet: null,
      appStyle: AppStyle
    }
});

App.init()
  .then(() => {
    vm.player = App.getCurrentPlayer();
    vm.currentPlanet = App.getCurrentPlanet();

    return Fleet.fetchPlayerFleets();
  }).then(fleets => { vm.fleets = fleets; })
;
