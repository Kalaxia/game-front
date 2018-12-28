require('../../../less/pages/fleet/details.less');

import App from '../../core/app.js';
import Fleet from '../../model/fleet.js';

import AppStyle from '../../app-style';

import FleetDetails from '../../components/organisms/fleet/details';
import TopMenu from '../../components/organisms/menu/top';
import BottomMenu from '../../components/organisms/menu/bottom';

//import Vue from 'vue';
import { i18n } from '../../lib/i18n';

const vm = new Vue({
    el: '#app',
    i18n,
    components: {
      FleetDetails,
      TopMenu,
      BottomMenu
    },
    data: {
      fleet: null,
      player: null,
      currentPlanet: null,
      appStyle: AppStyle
    }
});

App.init()
  .then(() => {
    const urlParams = new URLSearchParams(window.location.search);

    vm.player = App.getCurrentPlayer();
    vm.currentPlanet = App.getCurrentPlanet();

    return Fleet.fetch(urlParams.get('id'));
  }).then(fleet => { vm.fleet = fleet; })
;
