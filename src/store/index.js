import Vue from 'vue';
import Vuex from 'vuex';

import api from './modules/api';
import map from './modules/map';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        api,
        map,
        user
    }
});