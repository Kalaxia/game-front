<template>
    <div class="fleet-position" :style="style">
        <div class="hexagon">
            <div :class="['squadron', { empty: isEmpty }]" v-if="squadron">
                <ship-type :type="squadron.shipModel.type" :color="color" :size="(isEmpty) ? 24 : 18" />
                <span v-if="squadron.quantity > 0" :style="{ color }">{{ squadron.quantity }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import ShipType from '~/components/atoms/ship/type';
import { mapGetters } from 'vuex';

export default {
    name: 'fleet-position',

    props: ['x', 'y', 'isSelected', 'squadron'],

    components: {
        ShipType
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        style() {
            return {
                backgroundColor: this.color,
                borderColor: this.color,
                zIndex: (this.isSelected) ? 2 : 1
            }
        },

        color() {
            return this.factionColors[(this.isSelected) ? 'main' : 'white'];
        },

        isEmpty() {
            return this.squadron.quantity === 0;
        }
    }
}
</script>

<style lang="less" scoped>
    .fleet-position {
        float: left;
        position: relative;
        padding: 1px;
        margin-top: -5px;
        margin-left: -5px;
        transform: rotate(90deg);
        transition: border-color 0.1s ease-out, background-color 0.1s ease-out;
        cursor: pointer;

        &::before {
            content: " ";
            width: 0;
            height: 0;
            border-bottom: 12px solid;
            border-bottom-color: inherit;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            position: absolute;
            top: -12px;
            transition: inherit;
        }

        &::after {
            content: "";
            width: 0;
            position: absolute;
            bottom: -12px;
            border-top: 12px solid;
            border-top-color: inherit;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            transition: inherit;
        }

        & > .hexagon {
            position: relative;
            background-color: black;
            // width: 24px;
            // height: 24px;

            margin-top: 0px;
            width: 40px;
            height: 24px;

            &::before {
                content: " ";
                width: 0;
                height: 0;
                border-bottom: 12px solid black;
                border-left: 20px solid transparent;
                border-right: 20px solid transparent;
                position: absolute;
                top: -12px;
                z-index: 1;
            }

            &::after {
                content: "";
                width: 0;
                position: absolute;
                bottom: -12px;
                border-top: 12px solid black;
                border-left: 20px solid transparent;
                border-right: 20px solid transparent;
                z-index: 1;
            }

            & > .squadron {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                transform: rotate(-90deg);

                & > span {
                    font-size: 0.6em;
                    margin-top: 2px;
                }

                &:not(.empty) {
                    padding-left: 8px;
                }
            }
        }
    }
</style>