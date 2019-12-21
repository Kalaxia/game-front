<template>
    <svg class="territory">
        <circle class="system-territory"
            v-for="st in territory.systems"
            :key="`territory-${territory.id}-system-${st.system.id}`"
            :cx="st.system.coord_x * scale"
            :cy="st.system.coord_y * scale"
            :r="st.radius * scale"
            :style="style"
            @click="$emit('selectTerritory', territory)" />
    </svg>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'map-territory',

    props: ['territory'],

    computed: {
        ...mapState('map', ['scale']),

        style() {
            return {
                fill: this.territory.planet.player.faction.colors['mainLight'],
            };
        },
    }
}
</script>

<style lang="less" scoped>
    .territory {
        opacity: 0.4;
        transition: opacity 0.2s ease-out;
        cursor: pointer;

        &:hover {
            opacity: 0.6;
        }
    }
    
</style>