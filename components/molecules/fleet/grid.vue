<template>
    <div class="fleet-grid">
        <div class="line" v-for="y in 4" :key="`line-${y}`">
            <fleet-position v-for="x in 9"
                :key="`position-${x}-${y}`"
                :x="x"
                :y="y"
                :angle="angle"
                :squadron="getSquadron(x, y)"
                :colors="(fleet.player.faction) ? fleet.player.faction.colors : factionColors"
                :isSelected="selectedPosition && x === selectedPosition.x && y === selectedPosition.y"
                :currentAction="currentAction"
                @click.native="$emit('selectPosition', { x, y })" />
        </div>
    </div>
</template>

<script>
import FleetPosition from '~/components/atoms/fleet/position';
import { mapGetters } from 'vuex';

export default {
    name: 'fleet-grid',
    
    props: ['fleet', 'selectedPosition', 'currentAction', 'angle'],

    components: {
        FleetPosition
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    },

    methods: {
        getSquadron(x, y) {
            for (const s of this.fleet.squadrons) {
                if (s.position.x === x && s.position.y === y) {
                    return s;
                }
            }
            return null;
        }
    }
}
</script>

<style lang="less" scoped>
    .fleet-grid {
        position: relative;
        margin-top: 50px;

        & > .line {
            clear: left;

            & > .fleet-position:nth-child(even) {
                margin-top: 15px;
            }
        }
    }
</style>