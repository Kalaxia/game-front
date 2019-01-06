<template>
    <div id="starmap" :style="{ top: '20px', left: '20px' }">
        <transition-group v-if="mapReady" name="system-list" tag="div">
            <div id="journey-steps" v-if="journey" key="journey-steps">
                <journey-step v-for="step in journey.steps" :key="step.id" :step="step" />
            </div>
            <journey-range v-if="journey" key="journey-range" />
            <system-menu v-if="selectedSystemId" key="system-menu" />

            <system @dblclick.native="redirectToSystem(system.id)" v-for="system in map.systems" :key="system.id" :system="system"/>
        </transition-group>
        <map-loader v-else />
    </div>
</template>

<script>
import System from '../../molecules/map/system';
import SystemMenu from '../../molecules/map/system-menu';
import MapLoader from '../../atoms/map/loader';
import JourneyRange from '../../molecules/fleet/journey-range';
import JourneyStep from '../../molecules/fleet/journey-step';

const dragData = {
    drag: false,
    offsetX: null,
    offsetY: null,
    coordX: null,
    coordY: null
}

let centered = false;

export default {
    name: 'starmap',

    props: ['map'],

    components: {
        System,
        SystemMenu,
        MapLoader,
        JourneyRange,
        JourneyStep
    },

    mounted: function() {
        document.onmousedown = this.startMapMove;
        document.onmouseup = this.stopMapMove;
    },

    updated: function() {
        if (this.mapReady && centered === false) {
            this.goToCurrentPlanet();
        }
    },

    beforeDestroy: function() {
        centered = false;
        document.onmousedown = null;
        document.onmouseup = null;
    },

    computed: {
        mapReady: function() {
            return this.map !== null && this.$store.state.user.currentPlanet !== null;
        },

        journey: function() {
            if (this.$store.state.map.fleet === null) {
                return null;
            }
            return this.$store.state.map.fleet.journey;
        },

        selectedSystemId: function() {
            return this.$store.state.map.selectedSystemId;
        }
    },

    methods: {
        startMapMove: function(e) {
            // only left click
            if (e.button !== 0) {
                return false;
            }
            const map = document.querySelector("#starmap");
            
            dragData.offsetX = e.clientX;
            dragData.offsetY = e.clientY;

            dragData.coordX = parseInt(map.style.left);
            dragData.coordY = parseInt(map.style.top);
            dragData.drag = true;
            
            document.onmousemove = this.moveMap;
        },

        moveMap: function(e) {
            if (!dragData.drag) {
                return;
            }
            if (!e) {
                e = window.event;
            }
            const map = document.querySelector("#starmap");

            map.style.left = dragData.coordX + (e.clientX - dragData.offsetX) + 'px';
            map.style.top = dragData.coordY + (e.clientY - dragData.offsetY) + 'px';

            return false;
        },

        stopMapMove: function() {
            dragData.drag = false;
            document.onmousemove = null;
        },

        redirectToSystem: function(systemId) {
            this.$router.push(`/map/system/${systemId}`);
        },

        goToCurrentPlanet: function() {
            const starmap = document.querySelector('#starmap');
            const system = document.querySelector('.system.mine');
            const systemX = parseInt(system.style.left);
            const systemY = parseInt(system.style.top);

            starmap.style.top = parseInt(window.innerHeight) / 2 - systemY + 'px';
            starmap.style.left = parseInt(window.innerWidth) / 2 - systemX + 'px';

            centered = true;
        }
    }
}
</script>

<style lang="less" scoped>
    #starmap {
        position: absolute;

        & > div {
            & > .system {
                transition: opacity 0.2s ease-out;
            }
        }
    }

    .system-list-enter, .system-list-leave-to {
        opacity: 0;
    }
</style>
