<template>
    <div id="fleet-composition">
        <squadron-cursor v-if="selectedSquadron"
            :squadron="selectedSquadron"
            :hangarGroup="selectedGroup" 
            @assignShips="$emit('assignShips', $event)"
            @validateQuantity="$emit('validateQuantity', $event)" />
        <fleet-grid @selectPosition="$emit('selectPosition', $event)" :fleet="fleet" :selectedPosition="selectedPosition" />
    </div>
</template>

<script>
import FleetGrid from '~/components/molecules/fleet/grid';
import SquadronCursor from '~/components/molecules/fleet/squadron-cursor';

export default {
    name: 'fleet-composition',
    
    props: ['fleet', 'selectedGroup', 'selectedPosition'],

    components: {
        FleetGrid,
        SquadronCursor
    },

    computed: {
        selectedSquadron() {
            if (!this.selectedPosition) {
                return null;
            }
            for (const s of this.fleet.squadrons) {
                if (s.position.x === this.selectedPosition.x && s.position.y === this.selectedPosition.y) {
                    return s;
                }
            }
            return null;
        }
    }
}
</script>

<style lang="less" scoped>
    #fleet-composition {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        padding-bottom: 10px;
    }
</style>