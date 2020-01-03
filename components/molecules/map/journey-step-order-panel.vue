<template>
    <div id="order-panel" @click="$emit('unselectStep')">
        <div :style="{ backgroundColor: factionColors['grey'] }" @click.stop>
            <header>
                <h3 :style="{ color: factionColors['main'] }">
                    {{ $t('journey.planet_order', { order: $t(`journey.orders.${order}.title`), planet: step.endPlace.planet.name }) }}
                </h3>
            </header>
            <section class="order-choice">
                <div v-for="o in orders" :key="o" :style="{ borderColor: factionColors[(o === order) ? 'main' : 'white'] }" @click="order = o">
                    <order-picto :order="o" :size="64" :color="factionColors['white']" />
                </div>
            </section>
            <section class="order-details">
                <p>{{ $t(`journey.orders.${order}.description`) }}</p>
                <component v-if="extension !== null" :is="extension" :step="step" @selectOrder="selectOrder($event)" @unselectStep="$emit('unselectStep')" />
            </section>
            <footer v-if="extension === null">
                <div>
                    <button class="button" @click="$emit('unselectStep')" :style="{ color: factionColors['white'] }">
                        {{ $t('journey.planer.cancel_order') }}
                    </button>
                    <button class="button" @click="selectOrder({})" :style="{ color: factionColors['main'] }">
                        {{ $t('journey.planer.confirm_order') }}
                    </button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import OrderPicto from '~/components/atoms/fleet/order-picto';
import DeliveryOrder from '~/components/molecules/fleet/order/delivery';
import { ORDER_PASS, ORDER_CONQUER, ORDER_DELIVER } from '~/model/fleet/journeyStep';
import { mapGetters } from 'vuex';

export default {
    name: 'journey-step-order-panel',
    
    props: ['step'],

    data () {
        return {
            order: this.step.order,
            orders: [
                ORDER_PASS,
                ORDER_CONQUER,
                ORDER_DELIVER
            ]
        }
    },

    components: {
        OrderPicto
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        extension() {
            const extensions = {
                [ORDER_DELIVER]: DeliveryOrder
            };
            return (typeof extensions[this.order] !== 'undefined') ? extensions[this.order] : null;
        }
    },

    methods: {
        selectOrder (data) {
            this.$store.commit('map/stepOrder', {
                step: { ...this.step, ...{ data }},
                order: this.order
            });

            this.$emit('unselectStep');
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/button.less';

    #order-panel {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;

        & > div {
            width: 60%;
            padding: 10px 20px;
            border-radius: 10px;

            & > header {
                text-align: center;
            }

            & > .order-choice {
                margin: 10px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                flex-wrap: wrap;

                & > div {
                    border: 2px solid;
                    border-radius: 50%;
                    padding: 10px;
                    cursor: pointer;
                }
            }

            & > footer {
                margin-top: 20px;

                & > div {
                    margin-top: 10px;
                    display: flex;
                    justify-content: center;

                    & > button {
                        margin: 0px 10px;
                    }
                }
            }
        }
    }
</style>
