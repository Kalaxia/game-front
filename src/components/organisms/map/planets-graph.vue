<template>
    <div id="planets-graph">
        <img src="/static/images/picto/Pc_SS_Star_GR_64px.png" alt="star" class="star" />
        <div v-if="system">
            <div v-for="planet in system.planets" :key="planet.id">
                <div class="orbit" :style="orbitStyle(planet)">

                </div>
                <PlanetPicto class="planet" :style="planetStyle(planet)" @dblclick.native="redirectToPlanet(planet.id)" :type="planet.type" :width="24" :height="24" :reverse="true" />
            </div>
        </div>
    </div>
</template>

<script>
import PlanetPicto from 'components/atoms/planet/picto';

export default {
    name: 'map-planets-graph' ,
    
    props: ['system'],

    components: {
        PlanetPicto
    },

    mounted: function() {
        this.render();
    },

    methods: {

        planetStyle: function(planet) {
            const radius = planet.orbit.radius / 2;
            // formula : timeToRotate = 2*PI *sqrt(radius^3/(6.674*10^-11 . starMass)) with radius in meters, starMass in kg and time in seconds
            // note : the powers of 10 have been simplified to reduce the values as much as possible
            const timeElapsed = Date.now()/1000;// /1000 to get time in seconds
            const angleOffset = 0; //offset the startingPosition
            const starMass = 200; //(1-200) would be values coherent in physics. 10 is our sun's mass
            const calcRadius = radius * 1000 ; // times 1000 to fit the formula and take into consideration the units
            const gravitationalConstant = 2 * 6.674 ; //2 is for the mass of the smallest star and 6.674 is from the gravitational constant G
            const numberOfHoursInYear = 365.25*24;// to change earth rotation time ffor one year to one hour
            const timeToRotate = (( 2 * Math.PI ) * Math.sqrt((calcRadius * calcRadius * calcRadius)/ (starMass * gravitationalConstant))) / numberOfHoursInYear;
            const timeIntoCurrentRotation = timeElapsed % timeToRotate;
            const angle = (angleOffset + (timeIntoCurrentRotation / timeToRotate * ( 2 * Math.PI )));// angles in radians
            return {
                top: `calc((50% - ${(planet.orbit.radius / 2) + 1}px) + ${radius + (Math.cos(angle) * radius)}px - 16px)`,
                left: `calc((50% - ${(planet.orbit.radius / 2) + 1}px) + ${radius + (Math.sin(angle) * radius)}px - 16px)`,
                backgroundColor: (planet.player !== null) ? planet.player.faction.color : null
            };
        },

        orbitStyle: function(planet) {
            return {
                top: `calc(50% - ${(planet.orbit.radius / 2) + 1}px)`,
                left: `calc(50% - ${(planet.orbit.radius / 2) + 1}px)`,
                width: `${planet.orbit.radius}px`,
                height: `${planet.orbit.radius}px`,
                borderColor: (planet.player !== null) ? planet.player.faction.color : null
            };
        },

        redirectToPlanet: function(id) {
            this.$router.push(`/planet/${id}`);
        },

        render: function() {
            this.$forceUpdate();
            requestAnimationFrame(this.render.bind(this));
        }
    }
}
</script>

<style lang="less" scoped>
    .planets-graph {
        position: relative;
    }

    .star {
        position: absolute;
        width: 48px;
        height: 48px;
        top: calc(50% - 24px);
        left: calc(50% - 24px);
    }

    .orbit {
        position: absolute;
        border: 1px solid #A0A0A0;
        border-radius: 50%;
        z-index: -1;
    }

    .planet {
        position: absolute;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #A0A0A0;
        cursor: pointer;
    }
</style>
