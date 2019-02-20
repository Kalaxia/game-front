<template>
    <div class="resource-price-gauge">
        <div class="gauge">
            <div>
                <div>{{ price.amount }} <resource-item :resource="{ name: price.resource }" /></div>
                <span>x {{ coeff }}</span>
            </div>
            <div>
                <meter :value="currentQuantity" :max="storedResource"></meter>
            </div>
        </div>
        <div class="total">
            {{ currentQuantity }} <resource-item :resource="{ name: price.resource }" />
        </div>
    </div>
</template>

<script>
import ResourceItem from '~/components/atoms/resource/item';

export default {
    name: 'resource-price-gauge',

    props: ['price', 'coeff'],

    components: {
        ResourceItem
    },

    computed: {
        currentQuantity() {
            return this.price.amount * this.coeff;
        },

        storedResource() {
            return this.$store.getters['user/getStoredResource'](this.price.resource);
        }
    }
}
</script>

<style lang="less" scoped>
    .resource-price-gauge {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > .gauge {
            & > div:first-child {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;

                & > div {
                    & > img {
                        height: 22px;
                    }
                }
            }
        }

        & > .total {
            display: flex;
            align-items: flex-end;

            & > img {
                height: 24px;
            }
        }
    }
</style>
