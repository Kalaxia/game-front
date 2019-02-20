<template>
    <div class="range" ref="range" :style="style"></div>
</template>

<script>
import { TimelineLite, Linear } from 'gsap';

export default {
    name: 'fleet-journey-range',

    mounted: function() {
        const { range } = this.$refs;

        const timeline = new TimelineLite({
            onComplete: () => timeline.restart()
        });

        timeline.to(range, 60, {
            rotation: 359,
            force3D: true,
            ease: Linear.easeNone
        });
    },

    computed: {
        style: function() {
            const scale = this.$store.state.map.scale;
            const range = this.$store.state.map.fleet.range.planetToPlanet;
            const diameter = range * scale;

            return {
                top: (this.$store.getters['map/previousY'] * scale) - diameter / 2 + 'px',
                left: (this.$store.getters['map/previousX'] * scale) - diameter / 2 + 'px',
                width: `${diameter}px`,
                height: `${diameter}px`,
            }
        },
    }
}
</script>


<style lang="less" scoped>
    div {
        position: absolute;
        border: 6px dashed #EFEFEF;
        border-radius: 50%;
    }
</style>
