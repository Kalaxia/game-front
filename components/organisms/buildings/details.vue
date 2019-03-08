<template>
    <div id="building-details">
        <header>
            <building-image :building="building" width="76px" />

            <h3 :style="{ color: factionColor }">{{ $t('buildings')[building.name] }}</h3>
        </header>
        <section>
            <template v-for="(price, index) in building.price">
                <div :key="`building-price-${index}`" v-if="price.type !== 'resource'" class="price">
                    <span>{{ price.amount }}</span>
                    <colored-picto :src="(price.type === 'credits') ? 'G_P_Mon_64px.png' : 'Pc_GenieMilitaire.png'" color="white" :width="32" :height="32"/>
                </div>
            </template>

            <construction-state v-if="building.construction_state" :building="building" :pictoSize="32" gaugeHeight="24px" />
        </section>
        <footer>
            <button v-if="building.price" class="button" :style="{ color: factionColor }" @click="$emit('build', building)">
                <span class="big">{{ $t('buildings.build') }}</span>
            </button>
            <button v-if="building.construction_state" class="button" :style="{ color: factionColor }" @click="$emit('cancel', building)">
                <span class="big">{{ $t('buildings.cancel') }}</span>
            </button>
        </footer>
    </div>
</template>

<script>
import BuildingImage from '~/components/atoms/building/image';
import ColoredPicto from '~/components/atoms/colored-picto';
import ConstructionState from '~/components/atoms/building/construction-state';

export default {
    name: 'building-details',

    props: ['building'],

    components: {
        BuildingImage,
        ColoredPicto,
        ConstructionState
    },

    computed: {
        factionColor() {
            return this.$store.state.user.player.faction.color;
        }
    },
}
</script>

<style lang="less">
    @import '~less/atoms/button.less';
</style>


<style lang="less" scoped>
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

            & > h3 {
                margin-left: 20px;
            }
        }

        & > section {
            flex-grow: 1;
            width: 80%;
            margin: auto;
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

            & > .construction-state {
                align-content: center;
                width: 100%;
            }
        }

        & > footer {
            display: flex;
            justify-content: center;
        }
    }
</style>
