<template>
    <div id="journey-planer">
        <header>
            <h3>{{ $t('journey.planer.title') }}</h3>
        </header>
        <section>
            <strong>{{ $t('journey.planer.estimated_time') }}</strong>
            <span class="time">{{ $t('journey.planer.no_time') }}</span>
        </section>
        <footer>
            <button @click="removeLastStep">{{ $t('journey.planer.remove_last_step') }}</button>
            <button @click="sendFleet">{{ $t('journey.planer.send_fleet') }}</button>
        </footer>
    </div>
</template>

<script>
import { getFleetRange, sendOnJourney } from '~/api/fleet';

import JourneyStep from '~/model/fleet/journeyStep';

const OFFSET_SIZE_TARGET = -17; // -7 :  (widthExtene - widthIntern)/2 + boder width

export default {
    name: 'fleet-journey-planer',

    methods: {
        sendFleet: async function(event) {
            if (this.$store.state.map.fleet.journey.steps.length === 0) {
                return false;
            }
            await sendOnJourney(this.$store.state.map.fleet);

            this.$router.push('/map');
        },

        addPointMap: function(event) {
            if (event.type === 'contextmenu') {
                event.preventDefault();
            }
            if (!event.target.classList.contains('range')) {
                return false;
            }
            this.$store.state.map.selectedSystemId = null;

            const map = document.querySelector("#starmap");
            const scale = this.$store.state.map.scale;

            const x = (-parseInt(map.style.left) + event.clientX) / scale;
            const y = (-parseInt(map.style.top) + event.clientY) / scale;
            
            const stepData = {
                id: this.$store.state.map.fleet.journey.steps.length,
                map_pos_x_start: this.$store.getters['map/previousX'],
                map_pos_y_start: this.$store.getters['map/previousY'],
                planet_final: null,
                map_pos_x_final: x,
                map_pos_y_final: y,
            };
            
            const distance = Math.sqrt(Math.pow(x - stepData.map_pos_x_start, 2) + Math.pow(y - stepData.map_pos_y_start, 2));
            
            if (distance > this.$store.getters['map/range'](x, y, null)) {
                // TODO
                throw 'out of range';
            }
            this.$store.commit('map/addStep', new JourneyStep(stepData));
        },

        removeLastStep: function() {
            this.$store.commit('map/removeLastStep');
        }
    },

    mounted: async function() {
        await getFleetRange(this.$store.state.map.fleet);

        if (this.$store.state.map.fleet.isOnJourney()) {
            return false;
        }
        document.querySelector('body').addEventListener('contextmenu', this.addPointMap);
    }
}
</script>

<style lang="less" scoped>
    #journey-planer {
        background-color: #A0A0A0;
        padding: 10px 20px;
    }
</style>
