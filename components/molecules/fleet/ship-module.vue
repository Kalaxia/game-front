<template>
     <div class="ship-module">
        <header>
            <slot-shape :shipSlot="{ size: 'small', shape: module.shape }" :fill="true" />
            <h5>{{ moduleName }}</h5>
        </header>
        <section>
            <div class="stats">
                <div v-for="(value, stat) in module.stats" :key="`model-${module.slug}-${stat}`">
                    <span :style="{ color: (stat < 0) ? '#E72367' : '#68BA82' }">{{ value }}</span>
                    <stat-picto :stat="stat" :color="pictoColor(value)" size="18" />
                </div>
            </div>
            <div class="price">
                <div v-for="(price, index) in module.price" :key="`model-${module.slug}-price-${index}`">
                    <resource-item v-if="price.resource" :resource="{ name: price.resource }" width="18px" />
                    <colored-picto v-else :src="pricePicto(price)" color="white" width="18" height="18" />
                    <span :class="{ missing: isMissingPrice(price) }">{{ price.amount }}</span>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import ResourceItem from '~/components/atoms/resource/item';
import ColoredPicto from '~/components/atoms/colored-picto';
import StatPicto from '~/components/atoms/ship/stat-picto';
import SlotShape from '~/components/atoms/ship/slot-shape';

export default {
    name: 'ship-module',

    props: ['module'],

    components: {
        SlotShape,
        StatPicto,
        ColoredPicto,
        ResourceItem
    },

    computed: {
        moduleName() {
            return this.$i18n.t(`ships.modules.${this.module.slug}.name`)
        },
    },

    methods: {
        pictoColor(stat) {
            return (stat < 0) ? '#E72367' : '#68BA82'
        },

        pricePicto(price) {
            if (price.type === 'credits') {
                return 'G_P_Mon_64px.png';
            }
            return 'Pc_GenieMilitaire.png';
        },

        isMissingPrice(price) {
            if (price.type === 'resource' && this.$store.getters['user/getStoredResource'](price.resource) < price.amount) {
                return true;
            } else if (price.type === 'credits' && this.$store.state.user.player.wallet < price.amount) {
                return true;
            }
            return false;
        }
    }
}
</script>


<style lang="less" scoped>
    .ship-module {
        padding: 5px 10px;
        margin: 5px;
        border-radius: 10px;
        border: 1px solid white;

        & > header {
            display: flex;
            flex-direction: column;
            align-items: center;

            & > .slot-shape {
                width: 16px !important;
                height: 16px !important;
            }

            & > h5 {
                display: flex;
                align-items: center;
                height: 30px;
                margin: 5px 0px;
                font-variant: small-caps;
                text-align: center;
                max-width: 120px;
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

                    & > div {
                        justify-content: flex-end;

                        & > span {
                            margin-right: 5px;
                        }
                    }
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
    }
</style>
