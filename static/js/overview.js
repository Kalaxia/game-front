import App from './core/app.js';
import Planet from './model/planet.js';
import PlanetList from './components/planet/planet-list';

import Vue from 'vue';
import { i18n } from './lib/i18n';

const vm = new Vue({
    el: '#overview',
    i18n,
    components: {
      PlanetList
    },
    data: {
      planets: {}
    }
})

App.init()
  .then(() => Planet.fetchPlayerPlanets(App.getCurrentPlayer()))
  .then(planets => { vm.planets = planets; })
;
