<template>
    <div id="app">
        <top-menu v-if="currentPlayer.faction" :faction="currentPlayer.faction" />
        <alerts-list />
        <logout-button id="logout" />
        <nuxt id="wrapper" />
        <player-menu v-if="currentPlayer.avatar" :player="currentPlayer" />
        <planet-menu v-if="currentPlanet" :planet="currentPlanet" />
        <notifications-list v-if="currentPlayer.isActive" :notifications="currentPlayer.notifications" />
        <action-notifications :notifications="actionNotifications" />
    </div>
</template>

<script>
import AlertsList from '~/components/organisms/menu/alerts';
import TopMenu from '~/components/organisms/menu/top';
import ActionNotifications from '~/components/organisms/player/action-notifications';
import NotificationsList from '~/components/organisms/player/notifications';
import LogoutButton from '~/components/atoms/player/logout-button';
import PlayerMenu from '~/components/organisms/menu/player';
import PlanetMenu from '~/components/organisms/menu/planet';

export default {
    components: {
        AlertsList,
        TopMenu,
        LogoutButton,
        PlayerMenu,
        PlanetMenu,
        ActionNotifications,
        NotificationsList,
    },

    computed: {
        currentPlayer() {
            return this.$store.state.user.player;
        },

        currentPlanet() {
            return this.$store.state.user.currentPlanet;
        },

        actionNotifications() {
            return this.$store.state.user.actionNotifications;
        }
    }
}
</script>
