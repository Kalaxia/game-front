<template>
    <div id="ship-model-creation-recap">
        <header>
            <div v-for="(slot, index) in frame.slots" :key="`slot-recap-${index}`">
                <slot-recap v-if="slot.module" :shipSlot="slot" :isSelected="isSelected(slot)" />
            </div>
        </header>
        <section>
            <div class="price-recap">
                <div v-for="(price, index) in totalPrice" :key="`price-recap-${index}`">
                    <span>{{ price.amount }}</span>
                    <resource-item v-if="price.resource" :resource="{ name: price.resource }" width="22px" />
                    <colored-picto v-else :src="pricePicto(price)" color="white" width="22" height="22" />
                </div>
            </div>
            <div class="stats-recap">
                <div v-for="(value, stat) in totalStats" :key="`stat-recap-${stat}`">
                    <span :style="{ color: (stat < 0) ? '#E72367' : '#68BA82' }">{{ value }}</span>
                    <stat-picto :stat="stat" color="white" size="22" />
                </div>
            </div>
        </section>
        <footer>
            <button class="button big" :style="{ color: factionColors['main'] }" @click="$emit('createModel')">
                Créer
            </button>
        </footer>
    </div>
</template>

<script>
import ResourceItem from '~/components/atoms/resource/item';
import ColoredPicto from '~/components/atoms/colored-picto';
import StatPicto from '~/components/atoms/ship/stat-picto';
import SlotShape from '~/components/atoms/ship/slot-shape';
import SlotRecap from '~/components/molecules/fleet/slot-recap';
import { mapGetters } from 'vuex';

export default {
    name: 'ship-model-creation-recap',
    
    props: ['frame', 'selectedSlot'],

    components: {
        StatPicto,
        SlotShape,
        SlotRecap,
        ResourceItem,
        ColoredPicto
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        totalPrice() {
            return this.frame.slots.reduce((acc1, slot) => {
                // For each module, we add its price to the final price array
                return (slot.module) ? slot.module.price.reduce((acc2, price) => {
                    const index = acc2.findIndex((p) => p.type === price.type && (!p.resource || p.resource === price.resource));
                    if (index > -1) {
                        acc2[index].amount += price.amount;
                    } else {
                        acc2.push({ ...price });
                    }
                    return acc2;
                }, acc1) : acc1
            }, Array.from(this.frame.price, p => ({ ...p }))); // This is required to cut all references to the frame object
        },

        totalStats() {
            return this.frame.slots.reduce(
                // The second reducer iterates through the ship stats of each slot module
                (acc1, slot) => (slot.module && slot.module.ship_stats) ? Object.keys(slot.module.ship_stats).reduce(
                    (acc2, stat) => {
                        if (!acc2[stat]) {
                            acc2[stat] = 0;
                        }
                        acc2[stat] += slot.module.ship_stats[stat];
                        return acc2;
                    }, acc1)
                : acc1
            , { ...this.frame.stats }); // We initialize the reducer with a copy of the frame stats to avoid frame data modification
        }
    },

    methods: {
        isSelected(slot) {
            return slot === this.selectedSlot;
        },

        pricePicto(price) {
            if (price.type === 'credits') {
                return 'G_P_Mon_64px.png';
            }
            return 'Pc_GenieMilitaire.png';
        },

        pictoColor(stat) {
            return (stat < 0) ? '#E72367' : '#68BA82'
        },
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/button.less';

    #ship-model-creation-recap {
        flex-basis: 20%;
        padding: 5px 10px;
        border-left: 1px solid white;
        align-content: stretch;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        & > header {
            overflow-y: auto;
        }

        & > section {
            display: flex;
            justify-content: space-between;
            padding-top: 10px;
            border-top: 1px solid white;

            & > div {
                flex-basis: 40%;
                border-radius: 10px;
                border: 1px solid white;
                padding: 5px 10px;

                & > div {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin: 5px 0px;

                    & > span {
                        font-weight: bold;
                        margin-right: 5px;
                    }
                }
            }
        }

        & > footer {
            display: flex;
            justify-content: center;
            padding-top: 10px;
        }
    }
</style>
