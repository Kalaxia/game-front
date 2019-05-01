<template>
    <div id="notifications">
        <section class="list">
            <notification-group v-for="(n, type) in notifications"
                :key="type"
                :type="type"
                :notifications="n"
                @selectType="selectedType = (selectedType !== type) ? $event : null"
                :class="{ selected: selectedType === type }" />
        </section>
        <section class="details" v-if="selectedType">
            <notification-group-details :notifications="notifications[selectedType]" />
        </section>
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

        & > .details {
            position: absolute;

            bottom: 20px;
            left: -250px;
        }
    }
</style>
