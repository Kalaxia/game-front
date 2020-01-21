<template>
    <div id="building-details">
        <header>
            <building-header
                :building="building"
                :compartment="selectedCompartment"
                :plan="plan"
                @selectCompartment="$emit('selectCompartment', $event)"
                @showAvailableCompartments="$emit('showAvailableCompartments')" />
        </header>
        <section :style="{ borderColor: factionColors['white'] }">
            <h4 :style="{ color: factionColors['main'] }">{{ $t(`buildings.${building.name}.title`) }}</h4>

            <compartment-details
                v-if="selectedCompartment"
                :compartment="selectedCompartment"
                @buildCompartment="$emit('buildCompartment')" />
            <template v-else>
                <div v-if="plan.resources" class="resources">
                    <header>
                        <h4>{{ $t('planet.buildings.extracted_resources') }}</h4>
                    </header>
                    <section>
                        <resource-production v-for="r in presentResources" :key="r.name" :building="building" :resource="{name: r}" />
                    </section>
                </div>

                <div class="description">
                    <header>
                        <h4>{{ $t('planet.buildings.description') }}</h4>
                    </header>
                    <section>
                        <p>{{ $t(`buildings.${building.name}.description`) }}</p>
                    </section>
                </div>

                <div class="price-container" v-if="!building.id">
                    <header>
                        <h4>{{ $t('planet.buildings.price') }}</h4>
                    </header>
                    <section>
                        <template v-for="(price, index) in building.price">
                            <div :key="`building-price-${index}`" v-if="price.type !== 'resource'" class="price">
                                <span>{{ price.amount }}</span>
                                <colored-picto :src="(price.type === 'credits') ? 'G_P_Mon_64px.png' : 'Pc_GenieCivil.png'" color="white" :width="32" :height="32"/>
                            </div>
                        </template>
                    </section>
                </div>
            </template>
        </section>
        <footer>
            <construction-state v-if="building.constructionState" :building="building" :pictoSize="32" gaugeHeight="24px" />
            <button v-if="building.price" class="button" :style="{ color: factionColors['main'] }" @click="$emit('build', building)">
                <span class="big">{{ $t('buildings.build') }}</span>
            </button>
            <button v-if="building.constructionState" class="button" :style="{ color: factionColors['main'] }" @click="$emit('cancel', building)">
                <span class="big">{{ $t('buildings.cancel') }}</span>
            </button>
        </footer>
    </div>
</template>

<script>
import ResourceProduction from '~/components/molecules/resource/production';
import BuildingHeader from '~/components/molecules/building/header';
import CompartmentDetails from '~/components/molecules/building/compartment-details';
import ColoredPicto from '~/components/atoms/colored-picto';
import ConstructionState from '~/components/atoms/building/construction-state';
import { mapGetters } from 'vuex';

export default {
    name: 'building-details',

    props: ['building', 'selectedCompartment'],

    components: {
        BuildingHeader,
        CompartmentDetails,
        ColoredPicto,
        ConstructionState,
        ResourceProduction
    },

    computed: {
        ...mapGetters({
            currentPlanet: 'user/currentPlanet',
            factionColors: 'user/factionColors'
        }),

        plan() {
            return this.$resources.buildings[this.building.name];
        },

        presentResources() {
            const planetResources = this.currentPlanet.resources.map(r => r.name);

            return this.plan.resources.filter(r => planetResources.indexOf(r) >= 0);
        }
    },
}
</script>

<style lang="less">
    @import '~less/atoms/button.less';
</style>


<style lang="less">
    #building-details {
        grid-column: ~"4/10";
        grid-row: ~"3/9";
        padding: 10px;
        border: 1px solid #2D2D2D;
        border-radius: 10px;
        display: flex;
        flex-direction: column;

        & > header {
            display: flex;
            justify-content: center;
            padding-bottom: 20px;
        }

        & > section {
            flex-grow: 1;
            width: 80%;
            margin: auto;
            display: flex;
            flex-direction: column;
            border-top: 2px solid;
            overflow-y: auto;

            & > h4 {
                margin: 0px;
                margin-top: 10px;
                text-align: center;
                font-variant: small-caps;
            }

            & > .resources {
                & > section {
                    & > .resource-production {
                        margin: 10px 0px;
                    }
                }
            }

            & > .price-container {

                & > section {
                    display: flex;

                    & > .price {
                        display: flex;
                        align-content: flex-start;
                        align-items: center;
                        margin: 10px 20px;

                        & > span {
                            margin-right: 5px;
                        }
                    }
                }
            }
        }

        & > footer {
            display: flex;
            flex-direction: column;
            align-items: center;

            & > .construction-state {
                width: 100%;
                margin-bottom: 20px;
            }
        }
    }
</style>
