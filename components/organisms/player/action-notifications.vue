<template>
    <div id="action-notifications">
        <transition-group name="list-complete" tag="div">
            <div v-for="(notification, index) in notifications" :key="`n-${index}`" class="notification list-complete-item" :style="style(notification)">
                {{ $t(notification.content) }}
            </div>
        </transition-group>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'action-notifications',   

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        notifications() {
            return this.$store.state.user.actionNotifications;
        },
    },

    methods: {
        style (notification) {
            return (notification.isError) ? {
                color: 'red',
                borderColor: 'red',
                backgroundColor: this.factionColors['black'],
            } : {
                color: this.factionColors['white'],
                borderColor: this.factionColors['grey'],
                backgroundColor: this.factionColors['grey']
            };
        }
    }
}
</script>

<style lang="less" scoped>
    #action-notifications {

        .list-complete-item {
            transition: opacity 1s, transform 1s;
        }
        .list-complete-enter, .list-complete-leave-to
            /* .list-complete-leave-active below version 2.1.8 */ {
            opacity: 0;
            transform: translateX(30px);
        }

        & > div {
            .notification {
                z-index: 3;
                margin: 10px 0px;
                font-variant: small-caps;
                padding: 20px;
                border: 2px solid;
                border-radius: 10px;
            }
        }
    }
</style>
