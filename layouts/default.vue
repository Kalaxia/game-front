<template>
    <div id="app">
        <top-menu v-if="player.faction" :faction="player.faction" />
        <alerts-list />
        <logout-button id="logout" />
        <nuxt id="wrapper" />
        <player-menu v-if="player.avatar" :player="player" />
        <planet-menu v-if="currentPlanet" :planet="currentPlanet" />
        <notifications-list v-if="player.isActive" :notifications="player.notifications" />
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
import { mapState } from 'vuex';

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
        ...mapState('user', ['player', 'currentPlanet', 'actionNotifications'])
    }
}
</script>
