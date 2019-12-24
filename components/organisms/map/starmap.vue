<template>
    <div id="starmap" :style="style">
        <transition-group v-if="mapReady" name="system-list" tag="div">
            <map-territories :territories="territories" key="territories" @selectTerritory="$emit('selectTerritory', $event)" />
            <div id="journey-steps" v-if="journey" key="journey-steps">
                <journey-step v-for="step in journey.steps" :key="step.id" :step="step" />
            </div>
            <journey-range v-if="fleet" key="journey-range" />

            <fleet-pin v-for="fleet in fleets" :key="fleet.id" :fleet="fleet" />

            <system v-for="system in map.systems"
                :key="`system-${system.id}`"
                :system="system"
                @dblclick.native="redirectToSystem(system.id)"/>

        </transition-group>
        <map-loader v-else />
    </div>
</template>

<script>
import FleetPin from '~/components/atoms/fleet/map-pin';
import Vue from 'vue';
import System from '~/components/molecules/map/system';
import MapLoader from '~/components/atoms/map/loader';
import JourneyRange from '~/components/molecules/map/journey-range';
import JourneyStep from '~/components/molecules/map/journey-step';
import MapTerritories from '~/components/organisms/map/territories';
import { mapState } from 'vuex';

const dragData = {
    drag: false,
    offsetX: null,
    offsetY: null,
    coordX: null,
    coordY: null
};

export default {
    name: 'starmap',

    props: ['map', 'territories', 'playerPlanets', 'fleets', 'posX', 'posY'],

    data() {
        return {
            ready: false,
            loadedSectors: [],
            sectorSize: 10,
            playerSystems: [],
            centeredSystemId: 0,
        };
    },

    components: {
        FleetPin,
        System,
        MapLoader,
        MapTerritories,
        JourneyRange,
        JourneyStep
    },

    mounted() {
        document.onmousedown = this.startMapMove;
        document.onmouseup = this.stopMapMove;
        
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
        ...mapState('user', ['screen']),
        ...mapState('map', ['fleet', 'scale', 'selectedSystemId', 'targetedSystemId']),

        mapReady() {
            return this.map !== null;
        },

        journey() {
            return (this.fleet !== null) ? this.fleet.journey : null;
        },

        style() {
            return {
                top: `${(this.screen.height / 2) - (this.posY * this.scale)}px`,
                left: `${(this.screen.width / 2) - (this.posX * this.scale)}px`
            }
        }
    },

    watch: {
        targetedSystemId(systemId) {
            if (systemId === null || !this.mapReady) {
                return;
            }
            Vue.nextTick(this.goToTargetedSystem);
        },

        posX(posX) {
            this.expandSystems();
        }
    },

    methods: {
        expandSystems() {
            const coords = {
                startX: this.posX,
                startY: this.posY,
                finalX: this.posX + (this.screen.width / this.scale),
                finalY: this.posY + (this.screen.height / this.scale)
            };
            const sectors = {};

            for (const key in coords) {
                sectors[key] = Math[(key === 'startY' || key === 'startX') ? 'floor' : 'ceil'](coords[key] / this.sectorSize);
            }
            const sectorsPerLine = this.map.size / this.sectorSize;
            
            for (let y = sectors.startY; y <= sectors.finalY; y++) {
                const lineCoeff = y * sectorsPerLine;
                const startX = sectors.startX + lineCoeff;
                const finalX = sectors.finalX + lineCoeff;

                for (let x = startX; x <= finalX; x++) {
                    this.loadSector(x);
                }
            }
        },

        async loadSector(sector) {
            if (this.loadedSectors.indexOf(sector) >= 0) {
                return;
            }
            this.loadedSectors.push(sector);
            const systems = await this.$repositories.map.getSectorSystems(sector);

            for (const system of systems) {
                this.map.systems[system.id] = system;
            }
        },

        startMapMove(e) {
            // only left click
            if (e.button !== 0) {
                return false;
            }
            
            dragData.offsetX = e.clientX;
            dragData.offsetY = e.clientY;

            dragData.coordX = this.posX;
            dragData.coordY = this.posY;
            dragData.drag = true;
            
            document.onmousemove = this.dragMap;
        },

        dragMap(e) {
            if (!dragData.drag) {
                return;
            }
            if (!e) {
                e = window.event;
            }
            if (this.$store.state.map.isDragging === false) {
                this.$store.commit('map/drag', true);
            }
            this.$emit('updatePosition', {
                x: dragData.coordX - (e.clientX - dragData.offsetX) / this.scale,
                y: dragData.coordY - (e.clientY - dragData.offsetY) / this.scale
            });

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
            const system = document.querySelector(`#system-${this.targetedSystemId}`);

            this.$emit('updatePosition', {
                x: parseInt(system.style.left) / this.scale,
                y: parseInt(system.style.top) / this.scale
            });

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
