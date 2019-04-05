<template>
    <div id="shipyard-new-model">
        <div id="frames-choice" v-if="!selectedFrame">
            <ship-frames :frames="frames" @selectFrame="selectedFrame = $event" />
        </div>
        <div id="new-model" v-else>
            <ship-modules :modules="modules" :sizeFilter="moduleSizeFilter" :shapeFilter="moduleShapeFilter" @selectModule="selectModule" />

            <ship-frame :frame="selectedFrame" :selectedSlot="selectedSlot" :name="name" @selectSlot="selectedSlot = $event" @backToFrames="backToFrames"/>

            <ship-model-creation-recap :frame="selectedFrame" :selectedSlot="selectedSlot" :key="recapKey" @createModel="createModel" />
        </div>
    </div>
</template>

<script>
import ShipFrames from '~/components/organisms/fleet/ship-frames';
import ShipModules from '~/components/organisms/fleet/ship-modules';
import ShipFrame from '~/components/organisms/fleet/ship-frame';
import ShipModelCreationRecap from '~/components/organisms/fleet/ship-model-creation-recap';
import ShipModel from '~/model/ship/model';

export default {
    name: 'page-shipyard-new-model',

    asyncData({ app }) {
        return {
            name: 'XXX-111',
            selectedSlot: null,
            selectedFrame: null,
            frames: app.$resources.ship_frames,
            modules: app.$resources.ship_modules,
        };
    },
    
    components: {
        ShipFrames,
        ShipModules,
        ShipFrame,
        ShipModelCreationRecap
    },

    computed: {
        moduleSizeFilter() {
            return (this.selectedSlot) ? this.selectedSlot.size : null;
        },

        moduleShapeFilter() {
            return (this.selectedSlot) ? this.selectedSlot.shape : null;
        },

        recapKey() {
            return `recap-${(this.selectedSlot) ? this.selectedSlot.position : '0' }`;
        }
    },

    methods: {
        backToFrames() {
            for (const slot of this.selectedFrame.slots) {
                slot.module = null;
            }

            this.selectedSlot = null;
            this.selectedFrame = null;
        },

        selectModule(module) {
            if (this.selectedSlot === null) {
                return;
            }
            this.selectedSlot.module = module;
            this.selectedSlot = null;
        },

        async createModel() {
            const shipModel = new ShipModel({
                name: this.name,
                frame: this.selectedFrame,
                slots: this.selectedFrame.slots
            });

            await this.$repositories.ship.model.create(shipModel);

            this.backToFrames();
            this.$router.push('/buildings/shipyard');
        }
    }
}
</script>

<style lang="less" scoped>
    #frames-choice {
        grid-column: ~"3/9";
        grid-row: ~"3/9";
    }

    #new-model {
        padding: 20px;
        border-radius: 10px;
        background-color: #040804;
        border: 2px solid #242424;
        grid-column: ~"2/10";
        grid-row: ~"3/9";
        display: flex;
        justify-content: space-between;
        align-items: stretch;
    }
</style>
