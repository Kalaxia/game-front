<template>
    <div id="app">
        <top-menu :faction="currentPlayer.faction" />
        <logout-button id="logout" />
        <nuxt id="wrapper" />
        <player-menu :player="currentPlayer" />
        <planet-menu :planet="currentPlanet" />
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
