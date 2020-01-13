<template>
    <div id="combat-map" :style="{ borderColor: factionColors['grey'] }">
        <header>
            <h3>{{ $t('combat.visualization') }}</h3>
            <button v-if="report.endAt !== null || isCombatEnded" class="button" @click="$emit('showRecap')"  :style="{ color: factionColors['main'] }">
                {{ $t('combat.show_report') }}
            </button>
        </header>
        <section>
            <round-selector @selectRound="selectRound($event)" />
            <div class="grids-container">
                <div class="grids">
                    <fleet-grid :fleet="report.attacker" :currentAction="currentAction" :angle="-225"/>
                    <fleet-grid :fleet="report.defender" :currentAction="currentAction" :angle="-50"/>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import FleetGrid from '~/components/molecules/fleet/grid';
import RoundSelector from '~/components/molecules/combat-report/round-selector';
import Squadron from '~/model/fleet/squadron';
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'combat-map',

    props: ['report'],

    components: {
        FleetGrid,
        RoundSelector
    },

    async beforeMount() {
        await this.$store.dispatch('combat/initCombat', this.report);
    },

    destroyed() {
        this.$store.commit('combat/clearTimer');
    },

    watch: {
        isCombatEnded() {
            if (this.isCombatEnded === true) {
                setTimeout(() => this.$emit('showRecap'), 1000);
            }
        }
    },

    computed: {
        ...mapState('combat', ['isCombatEnded']),

        ...mapGetters({
            currentAction: 'combat/currentAction',
            factionColors: 'user/factionColors'
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
    @import '~less/atoms/button.less';

    #combat-map {
        padding: 10px 20px;
        border: 2px solid;
        border-radius: 10px;
        background-color: black;

        & > header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        & > section {
            display: flex;
            
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

       
    }
</style>