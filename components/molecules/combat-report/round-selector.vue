<template>
    <div class="round-selector">
        <div v-for="(r, i) in report.rounds"
            :key="r.id"
            :class="{ selected: round !== null && round.id == r.id }"
            :style="{ backgroundColor: factionColors['white'], color: factionColors['black'] }"
            @click="$emit('selectRound', r)">
            {{ i + 1 }}
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
    name: 'round-selector',

    computed: {
        ...mapGetters({
            report: 'combat/currentCombat',
            factionColors: 'user/factionColors'
        }),

        round() {
            return this.$store.state.combat.selectedRound;
        }
    },
}
</script>

<style lang="less" scoped>
    @import '~less/variables.less';

    .round-selector {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        padding: 0px 10px;
        z-index: 1;

        & > div {
            width: 48px;
            min-height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2em;
            font-weight: bold;
            border-radius: 50%;
            margin: 10px 0px;
            transition: background-color 0.2s ease-out, color 0.2s ease-out;
            cursor: pointer;

            &:not(.selected):not(:hover) {
                color: white !important;
                background-color: transparent !important;
            }
        }
    }
</style>