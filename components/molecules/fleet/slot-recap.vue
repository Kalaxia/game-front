<template>
    <div :class="['slot-recap', { selected: isSelected }]">
        <slot-shape :shipSlot="{ size: 'small', shape: shipSlot.module.shape }" :fill="true" />
        <div class="stats">
            <div v-for="(value, stat) in shipSlot.module.stats" :key="`model-recap-${shipSlot.module.slug}-${value}`">
                <span :style="{ color: (stat < 0) ? '#E72367' : '#68BA82' }">{{ value }}</span>
                <colored-picto :src="statPicto(stat)" :color="pictoColor(value)" width="22" height="22" />
            </div>
        </div>
        <div class="price">
            <div v-for="(price, index) in shipSlot.module.price" :key="`price-recap-${index}`">
                <span>{{ price.amount }}</span>
                <resource-item v-if="price.resource" :resource="{ name: price.resource }" width="22px" />
                <colored-picto v-else :src="pricePicto(price)" color="white" width="22" height="22" />
            </div>
        </div>
    </div>
</template>

<script>
import SlotShape from '~/components/atoms/ship/slot-shape';
import ColoredPicto from '~/components/atoms/colored-picto';
import ResourceItem from '~/components/atoms/resource/item';

export default {
    name: 'slot-recap',

    props: ['shipSlot', 'isSelected'], 
    
    components: {
        SlotShape,
        ColoredPicto,
        ResourceItem
    },

    methods: {
        statPicto(stat) {
            return {
                damage: 'ships/Attack.svg',
                precision: 'ships/Precision.svg',
                nb_shots: 'ships/Multiple-shots.svg',
                armor: 'ships/Plating.svg',
                speed: 'ships/Dodge.svg',
                size: 'ships/Weight.svg',
                power: 'ships/Shield.svg'
            }[stat];
        },

        pricePicto(price) {
            if (price.type === 'credits') {
                return 'G_P_Mon_64px.png';
            }
            return 'Pc_GenieMilitaire.png';
        },

        pictoColor(stat) {
            return (stat < 0) ? '#E72367' : '#68BA82'
        }
    }
}
</script>

<style lang="less" scoped>
    .slot-recap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border-top: #242424 1px solid;
        border-bottom: #242424 1px solid;

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
</style>
