<template>
    <div id="fleet-details">
        <header>
            <h3>{{ $t('fleet.title', { fleet: fleet.id }) }}</h3>
            <div class="toolbar">
                <button @click="remove">{{ $t('fleet.remove') }}</button>
                <button @click="move">{{ $t('fleet.move') }}</button>
            </div>
        </header>
        <section>
            <fleet-data :fleet="fleet" />

            <div class="ship-groups">
                <header>
                    <h3>{{ $t('fleet.fleet_ships') }}</h3>
                </header>
                <section>
                    <transition-group name="list-complete" tag="div">
                        <ship-group v-for="group in fleet.shipGroups"
                            :group="group"
                            :key="group.id"
                            @click.native="transferShips(group, -1, $event);" />
                    </transition-group>
                </section>
            </div>

            <div class="ship-groups">
                <header>
                    <h3>{{ $t('fleet.hangar_ships') }}</h3>
                </header>
                <section>
                    <transition-group name="list-complete" tag="div">
                        <ship-group v-for="group in fleet.location.shipGroups"
                            :group="group"
                            :key="group.id"
                            @click.native="transferShips(group, 1, $event);" />
                    </transition-group>
                </section>
            </div>
        </section>
    </div>
</template>

<script>
import Fleet from '../../../model/fleet/fleet';
import FleetData from 'components/molecules/fleet/data';
import ShipGroup from 'components/molecules/ship/group';

import { getFleetShipGroups, transferShips, removeFleet } from '../../../api/fleet';
import { fetchHangarShipGroups } from '../../../api/planet';

export default {
    name: 'fleet-details',

    props: {
        fleet: {
            required: true,
            validator: prop => prop instanceof Fleet || prop === null
        }
    },

    data: function() {
        return {
            hangarShips: [],
        };
    },

    components: {
        FleetData,
        ShipGroup
    },

    mounted: function() {
        getFleetShipGroups(this.fleet);
        fetchHangarShipGroups(this.fleet.location);
    },

    methods: {
        remove: async function() {
            if (!confirm(this.$i18n.t('fleet.confirm_removal'))) {
                return false;
            }
            await removeFleet(this.fleet);
            
            this.$router.push('/fleets');
        },

        move: function() {
            this.$router.push({ path: '/map', query: { id: this.fleet.id} });
        },

        transferShips: function(shipGroup, quantity, event) {
            if (event.ctrlKey) {
                quantity *= 5;
            }
            transferShips(this.fleet, shipGroup, quantity);
        }
    }
}
</script>

<style lang="less" scoped>
    #fleet-details > header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > h3 {
            margin-top: 0px;
        }
    }

    .toolbar {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .ship-groups > section > div {
        display: flex;
        flex-wrap: wrap;

        & > div {
            margin: 5px;
        }
    }

    .ship-group {
        transition: all 1s;
        display: inline-block;
        margin-right: 10px;
    }
    .list-complete-enter, .list-complete-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
    .list-complete-leave-active {
        position: absolute;
    }
</style>
