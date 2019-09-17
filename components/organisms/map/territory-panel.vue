<template>
    <div class="territory-panel" :style="{ borderColor: factionColors['grey'], backgroundColor: factionColors['black'] }">
        <header>
            <faction-banner :faction="territory.planet.player.faction" :width="48" :height="56" />
            <h3>{{ $t('territory.title', { planet: territory.planet.name }) }}</h3>
            <colored-picto src="close_cross.svg" :color="factionColors['grey']" :width="32" :height="32" @click.native="$emit('close')" />
        </header>
        <section>
            <div>
                <p>{{ $t(`territory.${territory.planet.player.gender}_leader`) }} :</p>
                <player-link :player="territory.planet.player" :width="48" />
            </div>
            <div>
                <p>{{ $t('territory.capital') }} :</p>
                <nuxt-link class="planet-link" :to="`/planet/${territory.planet.id}`">
                    <planet-image :type="territory.planet.type" width="48px" height="48px" />
                    <span>{{ territory.planet.name }}</span>
                </nuxt-link>
            </div>
        </section>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import FactionBanner from '~/components/atoms/faction/banner';
import PlanetImage from '~/components/atoms/planet/image';
import PlayerLink from '~/components/atoms/player/link';
import { mapGetters } from 'vuex';

export default {
    name: 'territory-panel',
    
    props: ['territory'],

    components: {
        ColoredPicto,
        FactionBanner,
        PlanetImage,
        PlayerLink
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    .territory-panel {
        position: relative;
        border: 2px solid;
        border-radius: 10px;
        margin-right: 15px;
        padding: 10px 20px;

        & > header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            & > .faction-banner {
                position: absolute;
                top: 0px;
            }

            & > h3 {
                padding-left: 60px;
            }
        }

        & > section {
            & > div {
                & > p {
                    font-weight: bold;
                    font-size: 1.1em;
                }

                & > .planet-link {
                    display: flex;
                    align-items: center;
                    color: white;
                    text-decoration: none;

                    & > span {
                        margin-left: 10px;
                        font-size: 1em;
                    }
                }
            }
        }
    }

</style>