<template>
    <div id="ship-model-details">
        <div>
            <header>
                <h1>{{ $t(`ships.types.${model.type}`) }} <strong>{{ model.name }}</strong></h1>
            </header>
            <section>
                <img :src="`/static/images/shipyard/frame/${model.picture}`" :alt="model.name" />
            </section>
            <footer>
                <ship-stat v-for="stat in ['armor', 'speed']" :key="`model-details-stat-${stat}`" :stat="stat" :frameStat="frameStat(stat)" :finalStat="model.stats[stat]" />
            </footer>
        </div>
        <div>
            <resource-price v-for="price in resourcePrices" :key="`resource-price-${price.resource}`" :price="price" :coeff="nbShips" />

            <div>
                {{ nbShips }}
                <img :src="`/static/images/shipyard/frame/${model.picto}`" :alt="model.name" />
            </div>
            <button class="button" @click="produce" :style="{ color: factionColor }"><span class="big">Construire</span></button>
        </div>
    </div>
</template>

<script>
import ShipStat from '~/components/atoms/ship/stat';
import ResourcePrice from '~/components/molecules/resource/price-gauge';
import framesData from '~/resources/ship_frames';

export default {
    name: 'ship-model-details',
    
    props: ['model'],

    data() {
        return {
            nbShips: 1
        };
    },

    components: {
        ShipStat,
        ResourcePrice
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

        factionColor() {
            return this.$store.state.user.player.faction.color;
        }
    },

    methods: {
        frameStat(stat) {
            return (typeof framesData[this.model.frame].stats[stat] !== 'undefined') ? framesData[this.model.frame].stats[stat] : 0;
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~/assets/less/atoms/button.less';

    #ship-model-details {
        display: flex;
        align-items: stretch;
        border: 2px solid #808080;
        border-radius: 10px;
        margin-left: 20px;
        padding: 0px 10px;

        & > div {
            padding: 10px;
        }

        & > div:first-child {
            border-right: 2px solid #EFEFEF;

            & > header > h1 {
                font-weight: normal;
                
                & > strong {
                    font-size: 1.2em;
                    font-weight: bold;
                }
            }
        }
    }
</style>
