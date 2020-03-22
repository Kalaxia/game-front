<template>
    <div id="player-profile">
        <div class="data" :style="{ borderColor: factionColors['grey'] }">
            <header>
                <player-avatar :player="player" :width="64" :height="64" />
                <div class="name">
                    <h1>{{ player.pseudo }}</h1>
                    <h3>{{ $t('player.titles.governor') }} - {{ player.faction.name }}</h3>
                </div>
                <div class="banner">
                    <faction-banner :faction="player.faction" :width="64" :height="96" />
                </div>
            </header>
            <section>
                <div v-for="s in ['combat', 'industry', 'production', 'trade', 'politics']" :key="s">
                    <h4>{{ $t(`player.skill.${s}.title`) }}</h4>
                    <gauge :levels="gaugeLevels(s)" :background="factionColors['black']" />
                </div>
            </section>
        </div>
        <planet-list :planets="planets" :style="{ borderColor: factionColors['grey'] }" />
    </div>
</template>

<script>
import Gauge from '~/components/atoms/gauge';
import PlayerAvatar from '~/components/atoms/player/avatar';
import FactionBanner from '~/components/atoms/faction/banner';
import PlanetList from '~/components/organisms/planet/list';
import { mapGetters } from 'vuex';

export default {
    name: 'player-profile',
    
    props: ['player', 'planets'],

    components: {
        FactionBanner,
        Gauge,
        PlayerAvatar,
        PlanetList
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    },

    methods: {
        gaugeLevels (skill) {
            return [
                {
                    value: (this.player.skills[skill] / 500) * 100,
                    color: this.factionColors['main']
                }
            ];
        }
    }
}
</script>

<style lang="less" scoped>
    #player-profile {
        display: flex;
        justify-content: space-between;

        & > div {
            flex-basis: 40%;
            flex-grow: 1;
            padding: 10px 20px;
            border: 2px solid;
            border-radius: 10px;
        }

        & > .data {
            margin-right: 40px;
            padding-top: 0px;

            & > header {
                display: flex;
                align-items: flex-start;

                & > div:not(.banner) {
                    padding-top: 10px;
                }

                & > .name {
                    margin-left: 15px;

                    & > h1 {
                        margin: 0px;
                    }

                    & > h3 {
                        margin: 0px;
                    }
                }

                & > .banner {
                    flex-grow: 1;
                    display: flex;
                    justify-content: flex-end;
                }
            }

            & > section {
                display: flex;
                flex-direction: column;
                align-items: stretch;

                & > div {
                    & > .gauge {
                        width: 100%;
                        height: 20px;
                    }
                }
            }
        }
    }
</style>
