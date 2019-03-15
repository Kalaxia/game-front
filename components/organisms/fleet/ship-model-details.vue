<template>
    <div id="ship-model-details">
        <div>
            <header>
                <h1>{{ $t(`ships.types.${model.type}`) }} <strong>{{ model.name }}</strong></h1>
            </header>
            <section>
                <img :src="`/images/shipyard/frame/${model.frame.picture}`" :alt="model.name" />
            </section>
            <footer>
                <ship-stat v-for="stat in ['armor', 'speed']" :key="`model-details-stat-${stat}`" :stat="stat" :frameStat="frameStat(stat)" :finalStat="model.stats[stat]" />
            </footer>
        </div>
        <div>
            <header>
                <resource-price v-for="(price, index) in resourcePrices" :key="`price-resource-${index}`" :price="price" :coeff="nbShips" />
                <template v-for="(price, index) in model.price">
                    <div v-if="price.type !== 'resource'" :key="`price-${index}`" class="price">
                        <div>
                            <div>{{ price.amount }} <colored-picto :src="(price.type === 'credits') ? 'G_P_Mon_64px.png' : 'Pc_GenieMilitaire.png'" color="white" :width="18" :height="18"/></div>
                            <strong>x {{ nbShips }}</strong>
                        </div>
                        <div>
                            <span>{{ price.amount * nbShips }}</span>
                            <colored-picto :src="(price.type === 'credits') ? 'G_P_Mon_64px.png' : 'Pc_GenieMilitaire.png'" color="white" :width="18" :height="18"/>
                        </div>
                    </div>
                </template>
                <gauge-selector @change="nbShips = $event" :color="factionColors['main']" :min="1" :max="max" :initialValue="1" />
            </header>
            <section>
                <div class="ship-indicator">
                    <span>{{ nbShips }}</span>
                    <img :src="`/images/shipyard/frame/${model.frame.picto}`" :alt="model.name" />
                </div>
                <colored-picto src="G_Pc_DblArr.png" color="white" :width="54" :height="22" />
                <div class="ship-cost">
                    <div v-for="price in resourcePrices" :key="`resource-${price.resource}`" :style="{ color: resourceColor(price.resource) }">
                        <span>{{ price.amount * nbShips }}</span>
                        <resource-picto :resource="{ name: price.resource }" />
                    </div>
                </div>
            </section>
            <footer>
                <button class="button" @click="produce()" :style="{ color: factionColors['main'] }">
                    <span class="big">Construire</span>
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
import ShipStat from '~/components/atoms/ship/stat';
import ResourcePrice from '~/components/molecules/resource/price-gauge';
import ResourcePicto from '~/components/atoms/resource/item';
import ColoredPicto from '~/components/atoms/colored-picto';
import GaugeSelector from '~/components/atoms/gauge-selector';
import { mapGetters } from 'vuex';

export default {
    name: 'ship-model-details',
    
    props: ['model'],

    data() {
        return {
            nbShips: 1,
            max: 1,
        };
    },

    components: {
        ShipStat,
        ResourcePrice,
        ResourcePicto,
        ColoredPicto,
        GaugeSelector
    },

    created() {
        this.max = this.maxAvailable;
    },

    computed: {
        resourcePrices() {
            const prices = new Array();
            for (const price of this.model.price) {
                if (price.type === 'resource') {
                    prices.push(price);
                }
            }
            return prices;
        },

        maxAvailable() {
            return this.model.maxAvailable;
        },

        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    },

    methods: {
        frameStat(stat) {
            return (typeof this.model.frame.stats[stat] !== 'undefined') ? this.model.frame.stats[stat] : 0;
        },

        resourceColor(resource) {
            return this.$resources.resources[resource].color;
        },

        async produce() {
            await this.$repositories.ship.ship.create(this.model, this.$store.state.user.currentPlanet, this.nbShips);

            for (const price of this.model.price) {
                this.$store.commit('user/spend', price);
            }
            this.$emit('build');
            this.max = this.model.maxAvailable;
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/button.less';

    #ship-model-details {
        display: flex;
        align-items: stretch;
        border: 2px solid #808080;
        border-radius: 10px;
        margin-left: 20px;

        & > div {
            padding: 10px 20px;
        }

        & > div:first-child {
            border-right: 2px solid #EFEFEF;

            & > header > h1 {
                font-weight: normal;
                
                // & > strong {
                //     font-size: 1.2em;
                //     font-weight: bold;
                // }
            }

            & > section {
                & > img {
                    height: 250px;
                }
            }
        }

        & > div:last-child {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            flex-grow: 1;

            & > header {
                & > .price {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 0px;
                    border-top: 1px solid #2D2D2D;
                    border-bottom: 1px solid #2D2D2D;

                    & > div:first-child {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-grow: 1;

                        & > div {
                            display: flex;
                            align-items: center;

                            & > div {
                                margin-left: 10px;
                            }
                        }
                    }

                    & > div:last-child {
                        width: 80px;
                        display: flex;
                        justify-content: flex-end;

                        & > div {
                            margin-left: 10px;
                        }
                    }
                }

                & > .gauge-selector {
                    width: 100%;
                }
            }

            & > section {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 10px 0px;

                & > .ship-indicator {
                    margin-left: 10px;
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 2em;
                    font-weight: bold;
                }

                & > .ship-cost {
                    margin-left: 10px;
                    & > div {
                        text-align: right;
                        font-size: 0.8em;
                        margin: 2px 0px;

                        & > img {
                            width: 14px;
                            height: 14px;
                            margin-left: 2px;
                        }
                    }
                }
            }

            & > footer {
                display: flex;
                justify-content: center;
            }
        }
    }
</style>
