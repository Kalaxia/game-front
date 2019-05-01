<template>
    <div id="report-details">
        <party :party="report.attacker" :ships="report.attackerShips" :losses="report.attackerLosses" />
        <div class="data">
            <h4>{{ isVictory ? 'Victoire' : 'Défaite' }}</h4>
        </div>
        <party :party="report.defender" :ships="report.defenderShips" :losses="report.defenderLosses" />
    </div>
</template>

<script>
import Party from '~/components/molecules/combat-report/party';
import { mapGetters } from 'vuex';

export default {
    name: 'combat-report-details',

    props: ['report'],

    components: {
        Party
    },

    computed: {
        ...mapGetters({
            currentPlayer: 'user/currentPlayer',
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
        align-items: stretch;
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
