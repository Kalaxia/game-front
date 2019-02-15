<template>
    <div class="step" :data-step-number="step.id">
        <div class="point" :style="pointStyle">
            <div class="point-inner-1"></div>
            <div class="point-inner-2"></div>
        </div>

        <div class="line" ref="line" :style="lineStyle">

        </div>
    </div>
</template>

<script>
import { TimelineLite, Linear } from 'gsap';

export default {
    name: 'fleet-journey-step',

    props: ['step'],

    mounted: function() {
        const { line } = this.$refs;

        const timeline = new TimelineLite({
            onComplete: () => timeline.restart()
        });

        timeline.to(line, 3, {
            backgroundPosition: '56px 0px',
            ease: Linear.easeNone
        });
    },

    computed: {
        pointStyle: function() {
            const scale = this.$store.state.map.scale;

            return {
                top: (this.step.endY) * scale - 10 + 'px',
                left: (this.step.endX) * scale - 10 + 'px'
            };
        },

	    lineStyle: function() {
            const scale = this.$store.state.map.scale;
            const angle = Math.atan2(this.step.endY - this.step.startY, this.step.endX - this.step.startX) * 180 / Math.PI;
            const distance = scale * Math.pow(
                Math.pow(this.step.startX - this.step.endX, 2.0) +
                Math.pow(this.step.startY - this.step.endY, 2.0)
            , 0.5);

            return {
                transform: `rotate(${angle}deg)`,
                width: `${distance}px`,
                height: '8px',
                top: (this.step.startY + this.step.endY) * scale / 2 - 4 + "px",
                left: (this.step.startX + this.step.endX) * scale / 2 - distance / 2 + "px",
            };
        },
    },

    methods: {
	    drawLinePosition (PosStartCenter,PosEndCenter, lineNode){
            
            lineNode.style.top = (PosStartCenter[1]+PosEndCenter[1])/2 - parseInt(lineNode.style.height)/2+ "px";
            lineNode.style.left = (PosStartCenter[0]+PosEndCenter[0])/2 - parseInt(lineNode.style.width)/2 + "px";
            
            return lineNode;
        }
    }
}
</script>

<style lang="less" scoped>
    .point {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: red;
    }

    .line {
        position: absolute;
        background-image: url('/static/images/map/line_step.png');
    }
</style>
