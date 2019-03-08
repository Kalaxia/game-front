<template>
    <div class="building-item" :style="{ borderColor: (isSelected) ? factionColor : 'grey'}">
        <building-image :building="building" width="56px" />
        <div>
            <h5>{{ $t('buildings')[building.name] }}</h5>
            <div v-if="building.price" class="prices">
                <div v-for="(price, index) in building.price" :key="`building-item-price-${index}`">
                    <span>{{ price.amount }}</span>
                    <colored-picto :src="(price.type === 'credits') ? 'G_P_Mon_64px.png' : 'Pc_GenieMilitaire.png'" color="white" :width="24" :height="24"/>
                </div>
            </div>
            <construction-state v-if="building.construction_state" :building="building" :pictoSize="24" gaugeHeight="15px" />
        </div>
    </div>
</template>

<script>
import Gauge from '~/components/atoms/gauge';
import BuildingImage from '~/components/atoms/building/image';
import ColoredPicto from '~/components/atoms/colored-picto';
import ConstructionState from '~/components/atoms/building/construction-state';

export default {
    name: 'building-item',
    
    props: ['building', 'isSelected'],

    components: {
        BuildingImage,
        ColoredPicto,
        ConstructionState,
        Gauge
    },

    computed: {
        factionColor() {
            return this.$store.state.user.player.faction.color;
        }
    },

    methods: {
        constructionLevel(constructionState) {
            return [{
                color: this.factionColor,
                value: Math.floor(constructionState.current_points / constructionState.points * 100)
            }];
        }
    }
}
</script>

<style lang="less" scoped>
    .building-item {
        display: flex;
        margin: 10px 0px;
        padding: 5px 10px;
        border: 1px solid grey;
        border-radius: 10px;
        cursor: pointer;

        & > div:last-child {
            flex-grow: 1;
            margin-left: 10px;

            & > h5 {
                margin: 0px;
            }

            & > .prices {
                display: flex;
                flex-wrap: wrap;
                margin-top: 5px;

                & > div {
                    display: flex;
                    align-items: center;
                    margin-right: 10px;

                    & > span {
                        padding-right: 5px;
                    }
                }
            }

            & > .construction-state {
                & > div:not(.gauge) {
                    & > span {
                        font-size: 0.8em;
                    }
                }
            }
        }
    }
</style>
