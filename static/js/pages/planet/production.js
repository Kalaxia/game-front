require('../../../less/pages/planet/production.less');

import App from '../../core/app.js';

import AppStyle from '../../app-style';

import ResourceDensityGraph from '../../components/molecules/resource/density-graph';
import ResourceStorage from '../../components/organisms/resource/storage';
import TopMenu from '../../components/organisms/menu/top';
import BottomMenu from '../../components/organisms/menu/bottom';

//import Vue from 'vue';
import { i18n } from '../../lib/i18n';

const vm = new Vue({
    el: '#app',
    i18n,
    components: {
      ResourceDensityGraph,
      ResourceStorage,
      TopMenu,
      BottomMenu
    },
    data: {
      player: null,
      currentPlanet: null,
      appStyle: AppStyle
    }
});

App.init().then(() => {
    vm.player = App.getCurrentPlayer();
    vm.currentPlanet = App.getCurrentPlanet();
});
