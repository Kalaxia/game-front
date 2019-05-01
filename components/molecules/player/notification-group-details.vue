<template>
    <div class="notification-group-details" :style="{ borderColor: factionColors['white'], backgroundColor: factionColors['black'] }">
        <notification v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
            :style="{ borderColor: factionColors['grey'] }" />
    </div>
</template>

<script>
import Notification from '~/components/atoms/player/notification.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'notification-group-details',
    
    props: ['notifications'],

    components: {
        Notification
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    .notification-group-details {
        width: 250px;
        max-height: 500px;
        overflow-y: auto;
        border: 2px solid;
        border-radius: 10px;
        padding: 10px 20px;

        & > .notification {
            border-bottom: 2px solid;

            &:last-child {
                border-bottom: none;
            }
        }
    }
</style>
