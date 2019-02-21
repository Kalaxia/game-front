<template>
    <div id="app">
        <top-menu v-if="currentPlayer" :faction="currentPlayer.faction"></top-menu>
        <logout-button id="logout"></logout-button>
        <nuxt id="wrapper" />
        <player-menu v-if="currentPlayer" :player="currentPlayer"></player-menu>
        <planet-menu v-if="currentPlanet" :planet="currentPlanet"></planet-menu>
    </div>
</template>

<script>
import TopMenu from '~/components/organisms/menu/top';
import LogoutButton from '~/components/atoms/player/logout-button';
import PlayerMenu from '~/components/organisms/menu/player';
import PlanetMenu from '~/components/organisms/menu/planet';

export default {
    components: {
        TopMenu,
        LogoutButton,
        PlayerMenu,
        PlanetMenu
    },

    async beforeCreate() {
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
}
</script>
