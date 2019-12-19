<template>
    <div id="combat-map">
        <round-selector @selectRound="selectRound($event)" />
        <div class="grids-container">
            <div class="grids">
                <fleet-grid :fleet="report.attacker" :currentAction="currentAction" :angle="-225"/>
                <fleet-grid :fleet="report.defender" :currentAction="currentAction" :angle="-50"/>
            </div>
        </div>
    </div>
</template>

<script>
import FleetGrid from '~/components/molecules/fleet/grid';
import RoundSelector from '~/components/molecules/combat-report/round-selector';
import Squadron from '~/model/fleet/squadron';
import { mapGetters } from 'vuex';

export default {
    name: 'combat-map',

    components: {
        FleetGrid,
        RoundSelector
    },

    destroyed() {
        this.$store.commit('combat/clearTimer');
    },

    computed: {
        ...mapGetters({
            report: 'combat/currentCombat',
            currentAction: 'combat/currentAction'
        }),
    },

    methods: {
        selectRound(round) {
            this.$store.dispatch('combat/selectRound', round);
        }
    }
}
</script>

<style lang="less" scoped>
    #combat-map {
        display: flex;
        padding: 10px 20px;
        border: 2px solid darkgrey;
        border-radius: 10px;
        background-color: black;

        & > .grids-container {
            flex-grow: 1;
            margin-left: 20px;
            margin-top: 50px;

            & > .grids {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                transform: rotate(-45deg);

                & > .fleet-grid:first-child {
                    transform: rotate(180deg);
                }
            }
        }
    }
</style>