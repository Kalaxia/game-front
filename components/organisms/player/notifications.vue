<template>
    <div id="notifications">
        <transition-group name="notification-group" tag="section">
            <notification-group v-for="(n, type) in notifications"
                :key="`notif-${type}`"
                :type="type"
                :notifications="n"
                @selectType="selectedType = (selectedType !== type) ? $event : null"
                :class="{ selected: selectedType === type }" />
        </transition-group>
        <transition appear>
            <section class="details" v-if="selectedType && notifications[selectedType]">
                <notification-group-details :notifications="notifications[selectedType]" />
            </section>
        </transition>
    </div>
</template>

<script>
import NotificationGroup from '~/components/molecules/player/notification-group';
import NotificationGroupDetails from '~/components/molecules/player/notification-group-details';

export default {
    name: 'notifications-list',
    
    props: ['notifications'],

    data () {
        return {
            selectedType: null
        };
    },

    components: {
        NotificationGroup,
        NotificationGroupDetails
    }
}
</script>

<style lang="less" scoped>
    #notifications {
        position: relative;
        display: flex;
        flex-direction: column-reverse;
        padding: 10px 20px;

        .notification-group {
            transition: all 1s;
        }
        
        .notification-group-enter, .notification-group-leave-to {
            opacity: 0;
            transform: translateY(30px);
        }

        .notification-group-leave-active {
            opacity: 1;
        }

        & > .details {
            position: absolute;

            bottom: 20px;
            left: -250px;
        }
    }
</style>
