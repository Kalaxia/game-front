<template>
    <nuxt-link :to="`/combats/${report.id}`" class="combat-report-item" :style="{ borderColor: factionColors['grey'], color: factionColors['white'] }">
        <div class="party">
            <player-avatar :player="report.attacker.player" :width="48" :height="48" />
            <div class="data">
                <h5>{{ report.attacker.player.pseudo }}</h5>
                <h6>{{ $t('fleet.title', { fleet: report.attacker.id }) }}</h6>
            </div>
        </div>
        <div class="result">
            <colored-picto :src="isVictory ? 'Victory.svg' : 'Defeat.svg'" :width="32" :height="32" :color="factionColors['mainLight']" />
        </div>
        <div class="party">
            <div class="data">
                <h5>{{ report.defender.player.pseudo }}</h5>
                <h6>{{ $t('fleet.title', { fleet: report.defender.id }) }}</h6>
            </div>
            <player-avatar :player="report.defender.player" :width="48" :height="48" />
        </div>
    </nuxt-link>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import PlayerAvatar from '~/components/atoms/player/avatar';
import { mapGetters } from 'vuex';

export default {
    name: 'combat-report-item',

    props: ['report'],

    components: {
        ColoredPicto,
        PlayerAvatar
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
            return (this.isAttacker && this.report.isVictory) || (!this.isAttacker && !this.report.isVictory);
        }
    }
}
</script>

<style lang="less" scoped>
    .combat-report-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        border-top: 1px solid;
        border-bottom: 1px solid;
        text-decoration: none;

        & > .party {
            display: flex;
            align-items: center;

            & > .data {
                margin: 0px 10px;

                & > h5 {
                    margin: 0px;
                }

                & > h6 {
                    margin: 0px;
                }
            }
        }
    }
</style>
