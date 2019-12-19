<template>
    <div class="fleet-pin" :style="style">
        <colored-picto src="ships/Fleet.svg" :color="fleet.player.faction.colors['main']" :width="18" :height="18" />
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import { mapGetters } from 'vuex';

export default {
    name: 'fleet-pin',
    
    props: ['fleet'],

    components: {
        ColoredPicto
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        percent() {
            const totalTime = this.fleet.journey.currentStep.arrivesAt.getTime() - this.fleet.journey.currentStep.startedAt.getTime();
            const currentTime = Date.now() - this.fleet.journey.currentStep.startedAt.getTime()

            return (currentTime / totalTime) * 100;
        },

        currentStep() {
            return this.fleet.journey.currentStep;
        },

        startX() {
            return (this.currentStep.startPlace.planet !== null) ? this.currentStep.startPlace.planet.system.coord_x : this.currentStep.startPlace.coordinates.x;
        },

        startY() {
            return (this.currentStep.startPlace.planet !== null) ? this.currentStep.startPlace.planet.system.coord_y : this.currentStep.startPlace.coordinates.y;
        },

        endX() {
            return (this.currentStep.endPlace.planet !== null) ? this.currentStep.endPlace.planet.system.coord_x : this.currentStep.endPlace.coordinates.x;
        },

        endY() {
            return (this.currentStep.endPlace.planet !== null) ? this.currentStep.endPlace.planet.system.coord_y : this.currentStep.endPlace.coordinates.y;
        },

        posX() {
            const distance = this.endX - this.startX;

            return (distance / 100) * this.percent;
        },

        posY() {
            const distance = this.endY - this.startY;

            return (distance / 100) * this.percent;
        },

        style() {
            const scale = this.$store.state.map.scale;

            return {
                top: (((this.startY + this.posY) * scale) - 14) + 'px',
                left: (((this.startX + this.posX) * scale) - 14) + 'px',
                borderColor: this.fleet.player.faction.colors['main'],
                backgroundColor: this.factionColors['black']
            };
        }
    }
}
</script>

<style lang="less" scoped>
    .fleet-pin {
        position: absolute;
        border: 2px solid;
        border-radius: 50%;
        padding: 5px;
    }
</style>
