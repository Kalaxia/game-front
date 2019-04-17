<template>
    <div :id="`system-${system.id}`"
        :class="['system', {mine: isPlayerSystem, expanded: system.planets}]"
        :style="style"
        @click="selectSystem"
        @contextmenu="selectSystem">
        <section v-if="isExpanded">
            <div v-for="(planet, index) in system.planets"
                :key="`system-${system.id}-planet-${planet.id}`"
                class="system-planet"
                :style="{ transform: `rotate(${45 * (index + 1)}deg)`, backgroundColor: planetColor(planet) }">

            </div>
            <div v-if="system.planets.length < 8"
                class="system-planet padding"
                :style="{ transform: `rotate(${45 * system.planets.length}deg)` }">

            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'map-system',

    props: ['system', 'isPlayerSystem'],

    computed: {
        style() {
            return {
                top: (this.system.coord_y * this.$store.state.map.scale) - 10 + 'px',
                left: (this.system.coord_x * this.$store.state.map.scale) - 10 + 'px',
                borderColor: (this.isExpanded) ? 'white' : 'grey'
            };
        },

        isExpanded() {
            return this.system.planets !== null;
        }
    },

    methods: {
        selectSystem() {
            if (this.$store.state.map.fleet === null) {
                return;
            }
            this.$store.commit('map/setSelectedSystemId', this.system.id);
        },

        planetColor(planet) {
            if (!planet.player) {
                return 'grey';
            }
            return planet.player.faction.colors['main'];
        }
    }
}
</script>

<style lang="less" scoped>
    .system {
        position: absolute;
        width: 20px;
        height: 20px;
        box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        border: 1px solid #FFF;
        background-color: #EFEFEF;

        &.mine {
            background-color: red;
        }

        &.expanded {
            width: 40px;
            height: 40px;
            background-color: black;
            border: 3px solid;
            overflow: hidden;
            box-shadow: none;
        }

        & > section {
            position: absolute;
            width: 100%;
            height: 100%;
            clip-path: circle(18px);

            & > .system-planet {
                position: absolute;
                bottom: 20px;
                right: 20px;
                width: 15px;
                height: 20px;
                background-color: yellow;
                border: 2px solid black;
                transform-origin: bottom right;
                clip-path: polygon(50% 0%, 100% 100%, 0% 100%);

                &.padding {
                    background-color: black;
                }
            }
        }

    }
</style>
