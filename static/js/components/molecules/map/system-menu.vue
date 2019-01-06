<template>
    <div v-if="system" :style="style" class="system-menu">
        <div v-for="(planet, index) in system.planets" :key="planet.id" @click="selectPlanet(planet.id)" :style="menuElementStyle(index, planet)">
            <planet-picto :type="planet.type" width="24" height="24" :style="planetPictoStyle" />
        </div>
    </div>
    <div v-else>

    </div>
</template>

<script>
import JourneyStep from '../../../model/fleet/journeyStep';
import { getSystem } from '../../../api/map';
import PlanetPicto from '../../atoms/planet/picto';

export default {
    name: 'map-system-menu',

    components: {
        PlanetPicto
    },

    data: function() {
        return {
            system: null
        };
    },

    mounted: async function() {
        this.system = await getSystem(this.$store.state.map.selectedSystemId);

        this.$store.watch((state) => state.map.selectedSystemId, async () => {
            if (this.$store.state.map.selectedSystemId === null) {
                this.system = null;
                return;
            }
            this.system = await getSystem(this.$store.state.map.selectedSystemId);
        });
    },

    methods: {
        selectPlanet: function(planetId) {
            let selectedPlanet = null;
            for (const planet of this.system.planets) {
                if (planet.id === planetId) {
                    selectedPlanet = planet;
                    break;
                }
            }
            const previousX = this.$store.getters['map/previousX'];
            const previousY = this.$store.getters['map/previousY'];
            const distance = Math.sqrt(Math.pow(this.system.x - previousX, 2) + Math.pow(this.system.y - previousY, 2));
            
            if (distance > this.$store.getters['map/range'](this.system.x, this.system.y, planetId)) {
                // TODO
                throw 'out of range';
            }
            this.$store.commit('map/addStep', new JourneyStep({
                id: this.$store.state.map.fleet.journey.steps.length,
                map_pos_x_start: previousX,
                map_pos_y_start: previousY,
                planet_start: this.$store.getters['map/previousPlanet'],
                map_pos_x_final: this.system.x,
                map_pos_y_final: this.system.y,
                planet_final: selectedPlanet,
            }));
        }
    },

    computed: {
        selectedSystemId: function() {
            return this.$store.state.map.selectedSystemId;
        },

        style: function() {
            const scale = this.$store.state.map.scale;

            return {
                top: this.system.y * scale - 50 + 'px',
                left: this.system.x * scale - 50 + 'px'
            };
        },

        anglesData: function() {
            const numberOfElement = this.system.planets.length;
			
			let angleStep;
			let elementAngleSize;
			
			if (numberOfElement <= 2){ // special transformation
				angleStep = 180; // 360/2
				elementAngleSize = 120;
			} else {
				angleStep = 360 / numberOfElement;
				elementAngleSize = angleStep;
            }
            
            return {
                angleStep: angleStep,
                angleStart: 90 - elementAngleSize / 2,
                skew: 90 - elementAngleSize
            };
        },

        menuElementStyle: function() {
            return (index, planet) => {
                const angleData = this.anglesData;
                const style = {
                    transform: `rotate(${180 + angleData.angleStart + angleData.angleStep*index}deg) skew(${angleData.skew}deg)`,
                };
                if (planet.player !== null) {
                    style.backgroundColor = planet.player.faction.color;
                }

                return style;
            };
        },

        planetPictoStyle: function() {
            return {
                transform: `skew(${-this.anglesData.skew}deg) rotate(-240deg)`
            };
			// menu.querySelectorAll(`div.menuElement > span > div`).forEach( (node) => {
			// 	node.style.transform = `rotate(${elementAngleSize/2}deg)`;
			// });
        }
    }
}
</script>

<style lang="less" scoped>
    .system-menu {
        position: relative;
        display: block;
        height: 100px;
        width: 100px;
        background-color: #f0f0f0;
        border-radius: 50%;
        overflow: hidden;
        pointer-events: all;
        z-index:30;
        & > div {
            position: absolute;
            left: 50%;
            top: 50%;
            transform-origin: 0% 0%;
            height: 200px;
            width: 200px;
            border: solid 0.5px darkgrey;
            transition: all 0.2s ease-out;
            background-color: black;
            padding: 5px;
            
            &:hover {
                filter: brightness(70%);
            }
        }
    }
</style>
