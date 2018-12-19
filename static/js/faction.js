require('../less/pages/faction/faction.less');

import Faction from './model/faction.js';
import App from './core/app';

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

import FactionData from './components/organisms/faction/faction';
import FactionMembers from './components/molecules/faction/members';
import FactionRelations from './components/molecules/faction/relations';
import TopMenu from './components/organisms/menu/top';
import BottomMenu from './components/organisms/menu/bottom';

import AppStyle from './app-style';
import Vue from 'vue';
import { i18n } from './lib/i18n';

const vm = new Vue({
    el: '#app',
    i18n,
    components: {
      FactionData,
      FactionMembers,
      FactionRelations,
      TopMenu,
      BottomMenu
    },
    data: {
      faction: null,
      player: null,
      currentPlanet: null,
      appStyle: AppStyle
    }
});

App.init()
  .then(() => {
    vm.player = App.getCurrentPlayer();
    vm.currentPlanet = App.getCurrentPlanet();

    return Faction.fetch((id !== null) ? id : vm.player.faction.id);
  }).then(faction => { vm.faction = faction; })
;
