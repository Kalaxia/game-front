<template>
    <div id="app">
        <top-menu v-if="currentPlayer.faction" :faction="currentPlayer.faction" />
        <logout-button id="logout" />
        <nuxt id="wrapper" />
        <player-menu v-if="currentPlayer.avatar" :player="currentPlayer" />
        <planet-menu v-if="currentPlanet" :planet="currentPlanet" />
        <notifications-list :notifications="currentPlayer.notifications" />
    </div>
</template>

<script>
import TopMenu from '~/components/organisms/menu/top';
import NotificationsList from '~/components/organisms/player/notifications';
import LogoutButton from '~/components/atoms/player/logout-button';
import PlayerMenu from '~/components/organisms/menu/player';
import PlanetMenu from '~/components/organisms/menu/planet';

export default {
    components: {
        TopMenu,
        LogoutButton,
        PlayerMenu,
        PlanetMenu,
        NotificationsList,
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
