<template>
    <div :class="['ship-slot', shipSlot.size, { selected: isSelected }]" :style="slotStyle">
        <module-price v-if="shipSlot.module" :module="shipSlot.module" />
        <slot-shape :shipSlot="shipSlot" :isSelected="isSelected" />
        <module-stats v-if="shipSlot.module" :module="shipSlot.module" />
    </div>
</template>

<script>
import SlotShape from '~/components/atoms/ship/slot-shape';
import ModulePrice from '~/components/molecules/fleet/module-price';
import ModuleStats from '~/components/molecules/fleet/module-stats';

export default {
    name: 'ship-slot',
    
    props: ['shipSlot', 'isSelected'],

    components: {
        SlotShape,
        ModulePrice,
        ModuleStats,
    },

    computed: {
        width() {
            let base = this.baseWidth;
            // If a module is affected, stats and price are both 22px
            if (this.shipSlot.module) {
                base += 44;
            }
            return base;
        },

        height() {
            return this.baseWidth;
        },

        baseWidth() {
            return {
                small: 40,
                medium: 50,
                large: 60
            }[this.shipSlot.size];
        },

        slotStyle() {
            return {
                minWidth: this.baseWidth,
                height: this.baseWidth,
                top: this.shipSlot.top ? (this.shipSlot.top - this.height / 2) + 'px'  :  null,
                left: this.shipSlot.left ? (this.shipSlot.left - this.width / 2) + 'px' : null,
                right: this.shipSlot.right ? (this.shipSlot.right - this.width / 2) + 'px' : null,
                bottom: this.shipSlot.bottom ? (this.shipSlot.bottom - this.height / 2) + 'px' : null,
            };
        }
    }
}
</script>

<style lang="less" scoped>
    .ship-slot {
        position: absolute;
        display: flex;
        align-items: center;
    }
</style>
