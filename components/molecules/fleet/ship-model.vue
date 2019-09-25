<template>
    <div class="ship-model-container" :style="style" :class="{ disabled: model.maxAvailable === 0 }">
        <div class="ship-model" :style="style" :class="{ selected: isSelected }">
            <header>
                <ship-type :type="model.type" :color="pictoColor" :size="32" />
                <h5>{{ $t(`ships.types.${model.type}`) }}</h5>
                <h4>{{ model.name }}</h4>
            </header>
            <section>
                <div class="stats">
                    <div v-for="(value, stat) in modelStats(model)" :key="`model-${model.id}-${stat}`">
                        <stat-picto :stat="stat" :color="pictoColor" size="18" />
                        <span>{{ value }}</span>
                    </div>
                </div>
                <div class="price">
                    <div v-for="(price, index) in model.price" :key="`model-${model.id}-price-${index}`">
                        <resource-item v-if="price.resource" :resource="{ name: price.resource }" />
                        <colored-picto v-else :src="pricePicto(price)" :color="pictoColor" width="18" height="18" />
                        <span :class="{ missing: isMissingPrice(price) }">{{ price.amount }}</span>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import ResourceItem from '~/components/atoms/resource/item';
import ShipType from '~/components/atoms/ship/type';
import StatPicto from '~/components/atoms/ship/stat-picto';
import ColoredPicto from '~/components/atoms/colored-picto';
import { mapGetters } from 'vuex';

export default {
    name: 'ship-model',
    
    props: ['model', 'isSelected'],

    components: {
        StatPicto,
        ColoredPicto,
        ResourceItem,
        ShipType
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        pictoColor() {
            return this.factionColors[(this.isSelected) ? 'black' : (this.model.maxAvailable === 0 ) ? 'grey' : 'white'];
        },

        style() {
            if (!this.isSelected) {
                return;
            }
            return {
                backgroundColor: this.$store.state.user.player.faction.colors['main']
            };
        }
    },

    methods: {
        modelStats(model) {
            const stats = {};
            for (const stat in model.stats) {
                if (stat === 'armor' || stat === 'speed' || stat === 'size' || stat === 'power') {
                    stats[stat] = model.stats[stat];
                }
            }
            return stats;
        },

        pricePicto(price) {
            if (price.type === 'credits') {
                return 'G_P_Mon_64px.png';
            }
            return 'Pc_GenieMilitaire.png';
        },

        isMissingPrice(price) {
            if (price.type === 'resource' && this.$store.getters['user/getStoredResource'](price.resource) < price.amount) {
                return true;
            } else if (price.type === 'credits' && this.$store.state.user.player.wallet < price.amount) {
                return true;
            }
            return false;
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/box.less';

    .ship-model-container {
        background-color: white;
        clip-path: @smallRectClipPath;
        padding: 1px;
        margin: 5px;
        cursor: pointer;

        & > .ship-model {
            padding: 5px 10px;
            background-color: black;
            clip-path: @smallRectClipPath;

            & > header {
                font-variant: small-caps;
                display: flex;
                flex-direction: column;
                align-items: center;

                h4, h5 {
                    margin: 0px;
                }
            }

            & > section {
                display: flex;
                justify-content: space-between;
                padding-top: 10px;
                padding-bottom: 5px;

                & > div {
                    flex-basis: 48%;

                    &:first-child {
                        border-right: 1px solid white;
                    }

                    & > div {
                        display: flex;
                        align-items: center;
                        padding: 5px;

                        & > img {
                            width: 18px;
                            height: 18px;
                        }

                        & > span {
                            margin-left: 5px;
                            font-size: 0.8em;
                        }
                    }
                }
            }

            &.selected {
                color: black;

                & > section > div:first-child {
                    border-color: black;
                }
            }
        }

        &.disabled {
            background-color: #4D4D4D;
            color: #4D4D4D;

            & > .ship-model {
                & > section {
                    & > div {
                        &:first-child {
                            border-right: 1px solid #4D4D4D;
                        }
                    }

                    & > .price {
                        & > div {
                            & > span.missing {
                                color: red;
                            }
                        }
                    }
                }
            }
        }
    }

    
</style>
