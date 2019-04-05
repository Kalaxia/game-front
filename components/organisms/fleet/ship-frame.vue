<template>
    <div id="ship-frame">
        <header>
            <h2>{{ $t(`ships.frames.${frame.slug}`) }} <strong>{{ name }}</strong></h2>
        </header>
        <section>
            <div>
                <img :src="`/images/shipyard/frame/${frame.picture}`" />
                <ship-slot v-for="slot in frame.slots" :key="slotKey(slot)" :isSelected="selectedSlot === slot" :shipSlot="slot" @click.native="$emit('selectSlot', slot)" />
            </div>
        </section>
        <footer>
            <button class="button" @click="$emit('backToFrames')">{{ $t("ships.back_to_frames") }}</button>
        </footer>
    </div>
</template>

<script>
import ShipSlot from '~/components/molecules/fleet/ship-slot';

export default {
    name: 'ship-frame',

    props: ['frame', 'name', 'selectedSlot'],

    components: {
        ShipSlot
    },

    methods: {
        slotKey(slot) {
            return `slot-${slot.position}-${(slot.module) ? slot.module.slug : '0'}`;
        },
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/button.less';

    #ship-frame {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        & > header {
            & > h2 {
                font-variant: small-caps;
                font-weight: normal;

                & > strong {
                    font-weight: bold;
                }
            }
        }

        & > section {
            flex-grow: 1;

            & > div {
                position: relative;
            }
        }
    }
</style>
