<template>
    <div class="ship-model-container" @click="$emit('select', model)" :style="style">
        <div class="ship-model" :style="style" :class="{ selected: isSelected }">
            <header>
                <colored-picto class="type-picto" :src="`ships/${picto}`" :color="pictoColor" width="32" height="32" />
                <h5>{{ $t(`ships.types.${model.type}`) }}</h5>
                <h4>{{ model.name }}</h4>
            </header>
            <section>
                <div class="stats">
                    <div v-for="(value, stat) in model.stats" :key="`model-${model.id}-${stat}`">
                        <colored-picto :src="statPicto(stat)" :color="pictoColor" width="18" height="18" />
                        <span>{{ value }}</span>
                    </div>
                </div>
                <div class="price">
                    <div v-for="(price, index) in model.price" :key="`model-${model.id}-price-${index}`">
                        <resource-item v-if="price.resource" :resource="{ name: price.resource }" />
                        <colored-picto v-else :src="pricePicto(price)" :color="pictoColor" width="18" height="18" />
                        <span>{{ price.amount }}</span>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import ResourceItem from 'components/atoms/resource/item';
import ColoredPicto from 'components/atoms/colored-picto';

export default {
    name: 'ship-model',
    
    props: ['model', 'isSelected'],

    components: {
        ColoredPicto,
        ResourceItem
    },

    computed: {
        picto() {
            return {
                bomber: 'S_Pc_Bb_BK_64px.png',
                fighter: 'S_Pc_Ch_BK_64px.png',
            }[this.model.type];
        },

        pictoColor() {
            return (this.isSelected) ? 'black' : 'white';
        },

        style() {
            if (!this.isSelected) {
                return;
            }
            return {
                backgroundColor: this.$store.state.user.player.faction.color
            };
        }
    },

    methods: {
        statPicto(stat) {
            return {
                armor: 'ships/Pc_Combats_Plating.png',
                speed: 'ships/Pc_Combats_Dodge.png'
            }[stat];
        },

        pricePicto(price) {
            if (price.type === 'credits') {
                return 'G_P_Mon_64px.png';
            }
            return 'Pc_GenieMilitaire.png';
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
    }

    .ship-model {
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
</style>
