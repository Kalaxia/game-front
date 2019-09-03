<template>
    <div id="starmap" :style="{ top: '20px', left: '20px' }" ref="starmap">
        <transition-group v-if="mapReady" name="system-list" tag="div">
            <map-territories :territories="territories" key="territories" />
            <div id="journey-steps" v-if="journey" key="journey-steps">
                <journey-step v-for="step in journey.steps" :key="step.id" :step="step" />
            </div>
            <journey-range v-if="fleet && fleet.location" key="journey-range" />

            <fleet-pin v-for="fleet in fleets" :key="fleet.id" :fleet="fleet" />

            <system v-for="system in map.systems"
                :key="`system-${system.id}`"
                :system="system"
                @dblclick.native="redirectToSystem(system.id)"
                :isPlayerSystem="playerSystems.indexOf(system.id) > -1"/>

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
import { mapGetters } from 'vuex';

const dragData = {
    drag: false,
    offsetX: null,
    offsetY: null,
    coordX: null,
    coordY: null
};

export default {
    name: 'starmap',

    props: ['map', 'territories', 'playerPlanets', 'fleets'],

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
        ...mapGetters({
            screenDimensions: 'user/screenDimensions',
            fleet: 'map/fleet'
        }),

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
        expandSystems() {
            const map = this.$refs.starmap;

            const coordX = parseInt(map.style.left);
            const coordY = parseInt(map.style.top);

            const mapScale = this.$store.state.map.scale;

            const coords = {
                startX: Math.abs(coordX / mapScale),
                startY: Math.abs(coordY / this.map.size),
                finalX: (Math.abs(coordX) + this.screenDimensions.width) / mapScale,
                finalY: (Math.abs(coordY) + this.screenDimensions.height) / this.map.size
            };
            const sectors = {};

            for (const key in coords) {
                sectors[key] = Math[(key === 'startY') ? 'floor' : 'ceil'](coords[key] / this.sectorSize);
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
            const map = this.$refs.starmap;
            
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
            const map = this.$refs.starmap;

            map.style.left = dragData.coordX + (e.clientX - dragData.offsetX) + 'px';
            map.style.top = dragData.coordY + (e.clientY - dragData.offsetY) + 'px';

            this.expandSystems();

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
            const starmap = this.$refs.starmap;
            const system = document.querySelector(`#system-${this.targetedSystemId}`);
            const systemX = parseInt(system.style.left);
            const systemY = parseInt(system.style.top);

            starmap.style.top = parseInt(window.innerHeight) / 2 - systemY + 'px';
            starmap.style.left = parseInt(window.innerWidth) / 2 - systemX + 'px';

            this.centeredSystemId = this.targetedSystemId;

            this.expandSystems();
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
