<template>
    <div id="planets-choice">
        <div class="list">
            <header>
                <h1 v-html="$t('registration.planet.title')"></h1>
            </header>
            <section>
                <planet-item v-for="planet in planets"
                    :key="planet.id"
                    :planet="planet"
                    :isSelected="selectedPlanet === planet"
                    @selectPlanet="selectPlanet"/>
            </section>
            <footer>
                <transition name="next">
                    <button v-if="selectedPlanet" class="big button" :style="{ borderColor: factionColors['main'], color: factionColors['main'] }" @click="$emit('confirmPlanet', selectedPlanet)">
                        <span>{{ $t('registration.start') }}</span>
                    </button>
                </transition>
            </footer>
        </div>
        <div class="details">
            <div class="info">
                <minimap v-if="screen.width >= 800"
                    :map="map"
                    :selectedPlanet="selectedPlanet"
                    :playerPlanets="planets"
                    :territories="territories"
                    :scale="4" />
                <div v-if="selectedPlanet" class="planet-info">
                    <header>
                        <h3>{{ selectedPlanet.name }}</h3>
                    </header>
                    <section>
                        <p>Population : <strong>{{ selectedPlanet.population }}</strong></p>
                    </section>
                </div>
            </div>
            <div class="data" v-if="selectedPlanet">
                <div>
                    <h3>Relations</h3>
                    <planet-relations :planet="selectedPlanet" width="300px" height="300px" />
                </div>
                <div>
                    <h3>Ressources</h3>
                    <resources-density-graph :id="selectedPlanet.id" :resources="selectedPlanet.resources" :size="300" />
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import Minimap from '~/components/organisms/map/minimap';
import PlanetItem from '~/components/molecules/registration/planet-item';
import PlanetRelations from '~/components/molecules/planet/relations';
import ResourcesDensityGraph from '~/components/molecules/resource/density-graph';
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'planets-choice',

    props: ['map', 'territories', 'planets'],

    data() {
        return {
            selectedPlanet: null,
        };
    },
    
    components: {
        Minimap,
        PlanetItem,
        PlanetRelations,
        ResourcesDensityGraph
    },

    computed: {
        ...mapState('user', ['screen']),

        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    },

    methods: {
        selectPlanet(planet) {
            this.selectedPlanet = planet;
            this.$store.commit('map/setTargetedSystemId', planet.system.id);
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/box.less';
    @import '~less/atoms/button.less';

    #planets-choice {
        display: flex;

        & > .list {
            margin-right: 20px;
            border-right: 2px solid grey;

            & > header {
                text-align: center;
                margin-bottom: 0px;
                border-bottom: 2px solid grey;

                & > h1 {
                    padding: 0px 20px;
                    font-variant: small-caps;
                    font-weight: normal;
                }
            }

            & > footer {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 20px;

                .next-enter-active, .next-leave-active {
                    transition: opacity .5s;
                }
                .next-enter, .next-leave-to {
                    opacity: 0;
                }
            }
        }

        & > .details {
            flex-grow: 1;

            & > .info {
                display: flex;

                & > .planet-info {
                    margin-left: 40px;
                }
            }

            & > .data {
                margin-top: 20px;
                display: flex;
                justify-content: space-around;
            }
        }
    }

    @media (max-width: 500px) {
        #planets-choice {
            & > header {
                & > h1 {
                    font-size: 1.4em;
                }
            }

            & > section {
                flex-direction: column;
            }
        }
    }
</style>
