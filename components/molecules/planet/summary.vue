<template>
     <div class="planet-summary" :class="{ reverse }">
        <header>
            <div class="player" v-if="planet.player">
                <player-avatar :player="planet.player" :width="48" :height="48" :disableBorder="true" />
                <em>{{ $t(`trade.${planet.player.gender}_seller`) }}</em>
                <strong :style="{ color: planet.player.faction.colors['main'] }">{{ playerPseudo }}</strong>
            </div>
            <div class="planet">
                <planet-picto :type="planet.type" :width="48" :height="48" />
                <em>{{ $t('trade.planet') }}</em>
                <strong>{{ planet.name }}</strong>
                <strong><planet-coords :planet="planet" /></strong>
            </div>
        </header>
        <section>
            <planet-image :type="planet.type" :width="48" :height="48" />
        </section>
    </div>
</template>

<script>
import PlayerAvatar from '~/components/atoms/player/avatar';
import PlanetCoords from '~/components/atoms/planet/coords';
import PlanetImage from '~/components/atoms/planet/image';
import PlanetPicto from '~/components/atoms/planet/picto';
import { mapGetters } from 'vuex';

export default {
    name: 'planet-summary',

    props: ['planet', 'reverse'],

    components: {
        PlayerAvatar,
        PlanetCoords,
        PlanetImage,
        PlanetPicto
    },

    computed: {
        ...mapGetters({
            currentPlayer: 'user/currentPlayer'
        }),

        playerPseudo() {
            return (this.planet.player.id === this.currentPlayer.id) ? this.$i18n.t('trade.yourself') : this.planet.player.pseudo;
        }
    }
}
</script>

<style lang="less" scoped>
    .planet-summary {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            border-bottom: 2px solid white;
            border-radius: 0px 0px 20px 20px;
            padding: 0px 10px 10px 10px;
            margin-bottom: 10px;

            & > .player,
            & > .planet {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }

        & > section {
            border: 2px solid white;
            border-radius: 50%;
            max-height: 48px;
        }

        &.reverse {
            flex-direction: column-reverse;

            & > header {
                border-top: 2px solid white;
                border-bottom: 0px solid white;
                border-radius: 20px 20px 0px 0px;
                padding: 10px 10px 0px 10px;
                margin-top: 10px;
            }
        }
    }
</style>