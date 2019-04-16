<template>
    <div id="starmap" :style="{ top: '20px', left: '20px' }">
        <transition-group v-if="mapReady" name="system-list" tag="div">
            <div id="journey-steps" v-if="journey" key="journey-steps">
                <journey-step v-for="step in journey.steps" :key="step.id" :step="step" />
            </div>
            <journey-range v-if="journey" key="journey-range" />
            <system-menu v-if="selectedSystemId" key="system-menu" />

            <system @dblclick.native="redirectToSystem(system.id)" v-for="system in map.systems" :key="system.id" :system="system" :isPlayerSystem="playerSystems.indexOf(system.id) > -1"/>
        </transition-group>
        <map-loader v-else />
    </div>
</template>

<script>
import Vue from 'vue';
import System from '~/components/molecules/map/system';
import SystemMenu from '~/components/molecules/map/system-menu';
import MapLoader from '~/components/atoms/map/loader';
import JourneyRange from '~/components/molecules/fleet/journey-range';
import JourneyStep from '~/components/molecules/fleet/journey-step';

const dragData = {
    drag: false,
    offsetX: null,
    offsetY: null,
    coordX: null,
    coordY: null
};

export default {
    name: 'starmap',

    props: ['map', 'playerPlanets'],

    data() {
        return {
            ready: false,
            playerSystems: [],
            centeredSystemId: 0,
        };
    },

    components: {
        System,
        SystemMenu,
        MapLoader,
        JourneyRange,
        JourneyStep
    },

    created() {
        this.processPlayerPlanets();
    },

    mounted() {
        document.onmousedown = this.startMapMove;
        document.onmouseup = this.stopMapMove;
    },

    updated() {
        if (this.mapReady && this.centeredSystemId !== this.targetedSystemId && this.targetedSystemId !== null) {
            this.goToTargetedSystem();
        }
    },

    beforeDestroy() {
        this.centeredSystemId = 0;
        document.onmousedown = null;
        document.onmouseup = null;
    },

    computed: {
        mapReady() {
            return this.map !== null && this.playerSystems.length > 0;
        },

        journey() {
            return (this.$store.state.map.fleet !== null) ? this.$store.state.map.fleet.journey : null;
        },

        selectedSystemId() {
            return this.$store.state.map.selectedSystemId;
        },

        targetedSystemId() {
            return this.$store.state.map.targetedSystemId;
        }
    },

    watch: {
        playerPlanets(playerPlanets) {
            this.processPlayerPlanets();
        },

        targetedSystemId(systemId) {
            if (systemId === null || !this.mapReady) {
                return;
            }
            Vue.nextTick(this.goToTargetedSystem);
        }
    },

    methods: {
        processPlayerPlanets() {
            for (const planet of this.playerPlanets) {
                this.playerSystems.push(planet.system.id);
            }
        },

        startMapMove(e) {
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

        moveMap(e) {
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

        stopMapMove() {
            dragData.drag = false;
            document.onmousemove = null;
        },

        redirectToSystem(systemId) {
            this.$router.push(`/map/systems/${systemId}`);
        },

        goToTargetedSystem() {
            const starmap = document.querySelector('#starmap');
            const system = document.querySelector(`#system-${this.targetedSystemId}`);
            const systemX = parseInt(system.style.left);
            const systemY = parseInt(system.style.top);

            starmap.style.top = parseInt(window.innerHeight) / 2 - systemY + 'px';
            starmap.style.left = parseInt(window.innerWidth) / 2 - systemX + 'px';

            this.centeredSystemId = this.targetedSystemId;
        }
    }
}
</script>

<style lang="less" scoped>
    #starmap {
        position: absolute;
        width: 100%;
        height: 100%;

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
