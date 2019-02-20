require ('~/assets/less/main.less');

import Vue from 'vue';
import router from 'router';
import store from 'store';
import { i18n } from 'lib/i18n';

import TopMenu from '~/components/organisms/menu/top';
import LogoutButton from '~/components/atoms/player/logout-button';
import PlayerMenu from '~/components/organisms/menu/player';
import PlanetMenu from '~/components/organisms/menu/planet';

const vm = new Vue({
    i18n,
    store,
    router,

    components: {
        TopMenu,
        LogoutButton,
        PlayerMenu,
        PlanetMenu
    },

    async beforeCreate() {
        await this.$store.dispatch('api/auth');
        if (this.$store.state.api.isAuthenticated) {
            await this.$store.dispatch('user/initPlayer');
            await this.$store.dispatch('user/initPlanet');
        }
    },

    computed: {
        currentPlayer() {
            return this.$store.state.user.player;
        },

        currentPlanet() {
            return this.$store.state.user.currentPlanet;
        }
    }
}).$mount('#app');
