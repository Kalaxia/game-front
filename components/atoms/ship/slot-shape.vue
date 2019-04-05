<template>
    <div :class="['slot-shape', shipSlot.shape, shipSlot.size, { fill: fill, selected: isSelected }]" :style="[shapeStyle ]">
        <div class="slot-shape-content">

        </div>
    </div>
</template>

<script>
export default {
    name: 'ship-slot-shape',

    props: ['shipSlot', 'isSelected', 'fill'],

    computed: {
        shapeStyle() {
            return {
                backgroundColor: (this.fill) ? 'white' : this.$store.state.user.player.faction.colors['main'] + `A0`
            };
        }
    }
}
</script>

<style lang="less" scoped>
    .slot-shape {
        padding: 5px;

        &:not(.selected) {
            background-color: #FFFFFFA0 !important;
        }

        &.fill {
            background-color: white !important;

            & > .slot-shape-content {
                background-color: white;
            }
        }

        &.circle {
            border-radius: 50%;

            &.small {
                width: 40px;
                height: 40px;
                background-size: 70%;
            }

            &.medium {
                width: 50px;
                height: 50px;
                background-size: 60px;
            }

            &.large {
                width: 60px;
                height: 60px;
                background-size: 80px;
            }

            & > .slot-shape-content {
                border-radius: 50%;
            }
        }

        &.square {
            border-radius: 5px;

            &.small {
                width: 40px;
                height: 40px;
                background-size: 70%;
            }

            &.medium {
                width: 50px;
                height: 50px;
                background-size: 70%;
            }

            &.large {
                width: 60px;
                height: 60px;
                background-size: 80px;
            }

            & > .slot-shape-content {
                border-radius: 5px;
            }
        }

        &.triangle {
            clip-path: polygon(0% 0%, 100% 0%, 50% 100%);

            &.small {
                width: 40px;
                height: 40px;
                background-size: 90%;
            }

            &.medium {
                width: 50px;
                height: 50px;
                background-size: 50%;
            }

            &.large {
                width: 60px;
                height: 60px;
                background-size: 80px;
            }

            & > .slot-shape-content {
                clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
            }
        }

        & > .slot-shape-content {
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.4);
        }
    }
</style>


