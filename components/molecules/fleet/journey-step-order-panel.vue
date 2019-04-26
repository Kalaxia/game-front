<template>
    <div id="order-panel" @click="$emit('unselectStep')">
        <div :style="{ backgroundColor: factionColors['grey'] }" @click.stop>
            <header>
                <h3 :style="{ color: factionColors['main'] }">
                    {{ $t('journey.planet_order', { order: $t(`journey.orders.${order}.title`), planet: step.endLocation.name }) }}
                </h3>
            </header>
            <section>
                <div v-for="o in orders" :key="o" :style="{ borderColor: factionColors[(o === order) ? 'main' : 'white'] }" @click="order = o">
                    <order-picto :order="o" :size="84" :color="factionColors['white']" />
                </div>
            </section>
            <footer>
                <p>{{ $t(`journey.orders.${order}.description`) }}</p>
                <div>
                    <button class="button" @click="$emit('unselectStep')" :style="{ color: factionColors['white'] }">
                        {{ $t('journey.planer.cancel_order') }}
                    </button>
                    <button class="button" @click="selectOrder" :style="{ color: factionColors['main'] }">
                        {{ $t('journey.planer.confirm_order') }}
                    </button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import OrderPicto from '~/components/atoms/fleet/order-picto';
import { ORDER_PASS, ORDER_CONQUER } from '~/model/fleet/journeyStep';
import { mapGetters } from 'vuex';

export default {
    name: 'journey-step-order-panel',
    
    props: ['step'],

    data () {
        return {
            order: this.step.order,
            orders: [
                ORDER_PASS,
                ORDER_CONQUER
            ]
        }
    },

    components: {
        OrderPicto
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    },

    methods: {
        selectOrder () {
            this.$store.commit('map/stepOrder', {
                step: this.step,
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

            & > section {
                margin: 10px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                flex-wrap: wrap;

                & > div {
                    border: 2px solid;
                    border-radius: 50%;
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
