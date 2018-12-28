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
                    <ship-group v-for="group in fleet.shipGroups" :group="group" :key="group.id" />
                </section>
            </div>

            <div class="ship-groups">
                <header>
                    <h3>{{ $t('fleet.hangar_ships') }}</h3>
                </header>
                <section>
                    <ship-group v-for="group in fleet.location.shipGroups" :group="group" :key="group.id" />
                </section>
            </div>
        </section>
    </div>
</template>

<script>
import Fleet from '../../../model/fleet';
import FleetData from '../../molecules/fleet/data';
import ShipGroup from '../../molecules/ship/group';

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
        this.fleet.fetchShipGroups();
        this.fleet.location.fetchShipGroups();
    },

    methods: {
        remove: function() {
            if (!confirm(this.$i18n.t('fleet.confirm_removal'))) {
                return false;
            }
            this.fleet.remove().then(() => {
                window.location.href = "/views/fleet/fleet-all.html";
            });
        },

        move: function() {
            window.location.href = `/views/map/?id=${this.fleet.id}`;
        }
    }
}
</script>

<style lang="less" scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .toolbar {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .ship-groups {
        & > section {
            display: flex;
            flex-wrap: wrap;

            & > div {
                margin: 5px;
            }
        }
    }
</style>
