<template>
    <div class="notification-group" :style="{ borderColor: color }">
        <div class="picto" @click="$emit('selectType', type)" :style="{ backgroundColor: factionColors['black'] }">
            <colored-picto :src="picto" :color="color" :width="24" :height="24" />
        </div>
        <div class="counter" :style="{ color: color }">{{ nbNotifications }}</div>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import { mapGetters } from 'vuex';

export default {
    name: 'notification-group',
    
    props: ['type', 'notifications'],

    components: {
        ColoredPicto
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        nbNotifications() {
            return this.notifications.length;
        },

        picto() {
            return {
                trade: 'B_Merc_64px.png',
                military: 'Combat.svg',
                faction: 'trade/Faction.svg',
                building: 'G_P_B_64px.png',
                shipyard: 'Shipyard_64px.png'
            }[this.type];
        },

        color() {
            return this.factionColors['white'];
        }
    }
}
</script>

<style lang="less" scoped>
    .notification-group {
        display: flex;
        justify-content: flex-end;
        margin: 10px 0px;
        z-index: 3;

        &:last-child {
            margin-bottom: 0px;
        }

        &.selected {
            & > .picto {
                border-radius: 0px 50px 50px 50px;
            }
        }

        & > .picto {
            padding: 15px;
            border: 3px solid;
            border-radius: 50px 0px 50px 50px;
            margin-right: 5px;
            cursor: pointer;
        }

        & > .counter {
            width: 20px;
            text-align: center;
            font-size: 1.2em;
        }
    }
</style>
