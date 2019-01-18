import Vue from 'vue';
import router from './router';
import store from './store';
import { i18n } from './lib/i18n';

import TopMenu from './components/organisms/menu/top';
import LogoutButton from './components/atoms/player/logout-button';
import BottomMenu from './components/organisms/menu/bottom';

const vm = new Vue({
    i18n,
    store,
    router,

    components: {
        TopMenu,
        LogoutButton,
        BottomMenu
    },

    created: async function() {
        await this.$store.commit('api/auth');
        await this.$store.dispatch('user/initPlayer');
        this.$store.dispatch('user/initPlanet');
    },

    computed: {
        currentPlayer: function() {
            return this.$store.state.user.player;
        },

        currentPlanet: function() {
            return this.$store.state.user.currentPlanet;
        }
    }
}).$mount('#app');
