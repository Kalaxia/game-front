<template>
    <div :class="['slot-recap', { selected: isSelected }]">
        <header>
            <h5>{{ $t(`ships.modules.${shipSlot.module.slug}.name`) }}</h5>
        </header>
        <section>
            <slot-shape :shipSlot="{ size: 'small', shape: shipSlot.module.shape }" :fill="true" />
            <div class="stats">
                <div v-for="(value, stat) in shipSlot.module.stats" :key="`model-recap-${shipSlot.module.slug}-${value}`">
                    <span :style="{ color: (stat < 0) ? '#E72367' : '#68BA82' }">{{ value }}</span>
                    <stat-picto :stat="stat" :color="pictoColor(value)" size="22" />
                </div>
                <div v-for="(value, stat) in shipSlot.module.ship_stats" :key="`model-recap-${shipSlot.module.slug}-${value}`">
                    <span :style="{ color: (stat < 0) ? '#E72367' : '#68BA82' }">{{ value }}</span>
                    <stat-picto :stat="stat" :color="pictoColor(value)" size="22" />
                </div>
            </div>
            <div class="price">
                <div v-for="(price, index) in shipSlot.module.price" :key="`price-recap-${index}`">
                    <span>{{ price.amount }}</span>
                    <resource-item v-if="price.resource" :resource="{ name: price.resource }" width="22px" />
                    <colored-picto v-else :src="pricePicto(price)" color="white" width="22" height="22" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import StatPicto from '~/components/atoms/ship/stat-picto';
import SlotShape from '~/components/atoms/ship/slot-shape';
import ColoredPicto from '~/components/atoms/colored-picto';
import ResourceItem from '~/components/atoms/resource/item';

export default {
    name: 'slot-recap',

    props: ['shipSlot', 'isSelected'], 
    
    components: {
        SlotShape,
        StatPicto,
        ColoredPicto,
        ResourceItem
    },

    methods: {
        pricePicto(price) {
            return (price.type === 'credits') ? 'G_P_Mon_64px.png' : 'Pc_GenieMilitaire.png';
        },

        pictoColor(stat) {
            return (stat < 0) ? '#E72367' : '#68BA82'
        }
    }
}
</script>

<style lang="less" scoped>
    .slot-recap {
        padding: 10px;
        border-top: #242424 1px solid;
        border-bottom: #242424 1px solid;

        & > header {
            & > h5 {
                margin: 0px;
            }
        }

        & > section {
            display: flex;
            align-items: center;
            justify-content: space-between;

            & > .slot-shape {
                width: 24px !important;
                height: 24px !important;
            }

            & > .stats {
                & > div {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin: 2px 0px;

                    & > span {
                        margin-right: 5px;
                    }
                }
            }

            & > .price {
                & > div {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin: 2px 0px;

                    & > span {
                        margin-right: 5px;
                    }
                }
            }
        }

        
    }
</style>
