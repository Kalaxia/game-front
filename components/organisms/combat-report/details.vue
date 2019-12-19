<template>
    <div id="report-details">
        <div class="data">
            <colored-picto :src="isVictory ? 'Victory.svg' : 'Defeat.svg'" :width="64" :height="64" :color="factionColors['main']" />
        </div>
        <planet-summary :planet="report.place.planet" :reverse="true" />
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto'
import Party from '~/components/molecules/combat-report/party';
import PlanetSummary from '~/components/molecules/planet/summary';
import { mapGetters } from 'vuex';

export default {
    name: 'combat-report-details',

    components: {
        ColoredPicto,
        Party,
        PlanetSummary
    },

    computed: {
        ...mapGetters({
            currentPlayer: 'user/currentPlayer',
            report: 'combat/currentCombat',
            factionColors: 'user/factionColors'
        }),

        isAttacker () {
            return this.currentPlayer.id === this.report.attacker.player.id;
        },

        isVictory () {
            return (this.isAttacker && this.report.is_victory) || (!this.isAttacker && !this.report.is_victory);
        }
    }
}
</script>

<style lang="less" scoped>
    #report-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        & > .data {
            display: flex;
            flex-direction: column;
            justify-content: center;

            & > h4 {
                font-variant: small-caps;
            }
        }
    }
</style>
