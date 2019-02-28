<template>
    <div class="resource-price-gauge">
        <div class="gauge-container">
            <div>
                <div>{{ price.amount }} <resource-item :resource="{ name: price.resource }" /></div>
                <strong>x {{ coeff }}</strong>
            </div>
            <div>
                <gauge :levels="gaugeLevels" :background="gaugeBackground" />
            </div>
        </div>
        <div class="total" :style="{ color: resourceColor }">
            {{ currentQuantity }} <resource-item :resource="{ name: price.resource }" />
        </div>
    </div>
</template>

<script>
import ResourceItem from '~/components/atoms/resource/item';
import resourcesData from '~/resources/resources';
import { shadeColor } from '~/lib/colors';
import Gauge from '~/components/atoms/gauge';

export default {
    name: 'resource-price-gauge',

    props: ['price', 'coeff'],

    components: {
        ResourceItem,
        Gauge
    },

    computed: {
        currentQuantity() {
            return this.price.amount * this.coeff;
        },

        storedResource() {
            return this.$store.getters['user/getStoredResource'](this.price.resource);
        },

        resourceColor() {
            return resourcesData[this.price.resource].color;
        },

        gaugeLevels() {
            return [
                {
                    value: this.price.amount / this.storedResource * 100,
                    color: this.resourceColor
                },
                {
                    value: this.currentQuantity / this.storedResource * 100,
                    color: shadeColor(this.resourceColor, '-0.2')
                },
            ]
        },

        gaugeBackground() {
            return shadeColor(this.resourceColor, '-0.4');
        }
    },
}
</script>

<style lang="less" scoped>
    .resource-price-gauge {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0px;
        border-top: 1px solid #2D2D2D;
        border-bottom: 1px solid #2D2D2D;

        & > .gauge-container {
            flex-grow: 1;

            & > div:first-child {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;

                & > div {
                    font-size: 0.9em;
                    & > img {
                        height: 18px;
                    }
                }
            }

            & > div:last-child {
                & > .gauge {
                    width: 100%;
                    height: 10px;
                    margin-top: 2px;
                }
            }
        }

        & > .total {
            width: 80px;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;

            & > img {
                height: 18px;
                margin-left: 10px;
            }
        }
    }
</style>
