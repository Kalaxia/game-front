<template>
    <div class="fleet-position" :style="style">
        <div class="loss" v-if="hasLoss" :style="{ transform: `rotate(${angle}deg)` }">
            -{{ currentAction.loss }}
        </div>
        <div class="hexagon" :style="hexagonStyle">
            <div :class="['squadron', { empty: isEmpty }, { shaking: isTarget }]" v-if="squadron">
                <ship-type :type="squadron.shipModel.type" :color="color" :size="(isEmpty) ? 24 : 18" />
                <span v-if="squadron.quantity > 0" :style="{ color }">{{ squadron.quantity }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import ShipType from '~/components/atoms/ship/type';

export default {
    name: 'fleet-position',

    props: ['x', 'y', 'isSelected', 'squadron', 'colors', 'currentAction', 'angle'],

    components: {
        ShipType
    },

    computed: {
        style() {
            return {
                backgroundColor: this.color,
                borderColor: this.color,
                zIndex: (this.isSelected) ? 2 : 1
            }
        },

        hexagonStyle() {
            let color = 'black';
            if (this.isFiring) {
                color = this.colors['main'];
            } else if (this.isTarget) {
                color = 'firebrick';
            }
            return {
                backgroundColor: color,
                borderTopColor: color,
                borderBottomColor: color,
            };
        },

        color() {
            return this.colors[(this.isSelected) ? 'main' : 'white'];
        },

        isEmpty() {
            return this.squadron.quantity === 0;
        },

        isFiring() {
            return this.squadron && this.currentAction && this.squadron.id === this.currentAction.squadron.id;
        },

        isTarget() {
            return this.squadron && this.currentAction && this.squadron.id === this.currentAction.target.id;
        },

        hasLoss() {
            return this.isTarget && this.currentAction.loss > 0;
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

        & > .loss {
            position: absolute;
            top: 0px;
            text-align: center;
            z-index: 10;
            font-size: 1.2em;

            animation-duration: 1s;
            animation-name: fleetCombatLoss;
            animation-iteration-count: infinite;
        }

        & > .hexagon {
            position: relative;
            background-color: black;
            border-top-color: black;
            border-bottom-color: black;
            // width: 24px;
            // height: 24px;

            margin-top: 0px;
            width: 40px;
            height: 24px;
            transition: background-color 0.4s ease-out;

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
                z-index: 1;
                transition: border-bottom-color 0.4s ease-out;
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
                transition: border-top-color 0.4s ease-out;
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

                &.shaking {
                    animation-name: squadronShaking;
                    animation-duration: 1s;
                    animation-iteration-count: infinite;
                }
            }
        }
    }
</style>