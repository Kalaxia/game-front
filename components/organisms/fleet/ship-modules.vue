<template>
    <div id="ship-modules">
        <header>
            <slot-shape v-if="shapeFilter" :shipSlot="{ size: 'small', shape: shapeFilter }" :fill="true" />
        </header>
        <section>
            <template v-for="module in modules">
                <ship-module v-if="isFiltered(module)" :key="module.slug" :module="module" @click.native="$emit('selectModule', module)" :style="moduleStyle(module)"/>
            </template>
        </section>
    </div>
</template>

<script>
import SlotShape from '~/components/atoms/ship/slot-shape';
import ShipModule from '~/components/molecules/fleet/ship-module';

export default {
    name: 'ship-modules',

    props: ['modules', 'selectedSlot', 'sizeFilter', 'shapeFilter'],

    components: {
        SlotShape,
        ShipModule
    },

    methods: {
        isFiltered(module) {
            return (this.sizeFilter === null || module.size === this.sizeFilter) && (this.shapeFilter === null || module.shape === this.shapeFilter);
        },

        moduleStyle(module) {
            if (!this.selectedSlot || this.selectedSlot.module !== module) {
                return {};
            }
            return {

            };
        }
    }
}
</script>

<style lang="less" scoped>
    #ship-modules {
        display: flex;
        flex-direction: column;
        flex-basis: 33%;
        border: 1px solid white;
        border-radius: 10px;
        padding: 10px;

        & > header {
            padding-bottom: 10px;
            border-bottom: 1px solid white;

            & > .slot-shape {
                width: 32px;
                height: 32px;
            }
        }

        & > section {
            display: flex;
            flex-wrap: wrap;
            padding-top: 10px;
            overflow-y: auto;

            & > .ship-module {
                margin: 5px;
            }
        }
    }
</style>

