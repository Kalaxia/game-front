<template>
    <p class="ship-stat">
        <span class="stat-name">{{ $t(`ships.stats.${stat}`) }}</span>
        <span class="stat-details">
            <span :class="{ fill: modularStat === 0 }">{{ frameStat }}</span>
            <span v-if="modularStat !== 0">+</span>
            <span v-if="modularStat !== 0">{{ modularStat }}</span>
        </span>
        <strong>{{ finalStat }}</strong>
        <colored-picto color="white" :src="picto(stat)" :width="32" :height="32"/>
    </p>
</template>

<script>
import ColoredPicto from '../colored-picto';

export default {
    name: 'ship-stat',

    props: ['stat', 'frameStat', 'finalStat'],

    components: {
        ColoredPicto
    },

    computed: {
        modularStat() {
            return this.finalStat - this.frameStat;
        }
    },

    methods: {
        picto(stat) {
            return {
                armor: 'ships/Pc_Combats_Plating.png',
                speed: 'ships/Pc_Combats_Dodge.png'
            }[stat];
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~/assets/less/variables.less';

    .ship-stat {
        display: flex;
        align-items: center;

        & > .stat-name {
            width: 120px;
            font-variant: small-caps;
            font-size: 1.2em;
        }

        & > .stat-details {
            display: flex;
            justify-content: space-around;
            text-align: center;
            align-items: center;
            width: 100px;
            margin-right: 20px;

            & > span.fill {
                width: 100%;
                text-align: left;
            }

            & > span:nth-child(3) {
                color: @checkGreen;
            }
        }

        & > strong {
            width: 40px;
            margin-right: 15px;
            font-size: 1.2em;
            text-align: center;
        }
    }
</style>
