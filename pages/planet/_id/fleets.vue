<template>
    <div>
        <hangar-details
            :groups="groups"
            :selectedGroup="selectedGroup"
            @selectGroup="selectGroup($event)" />

        <fleet-composition v-if="selectedFleet"
            :fleet="selectedFleet"
            :selectedPosition="selectedPosition"
            :selectedGroup="selectedGroup"
            @selectPosition="selectPosition($event)"
            @assignShips="assignShips($event)"
            @validateQuantity="validateQuantity($event)" />

        <fleet-list v-if="!selectedFleet"
            :fleets="fleets"
            :selectedFleet="selectedFleet"
            @selectFleet="selectedFleet = $event"
            @createFleet="fleets.push($event)" />

        <fleet-details v-else
            :fleets="fleets"
            :fleet="selectedFleet"
            :selectedPosition="selectedPosition"
            @selectPosition="selectPosition($event)"
            @selectFleet="selectedFleet = $event" />
    </div>
</template>

<script>
import HangarDetails from '~/components/organisms/planet/hangar-details';
import FleetComposition from '~/components/organisms/fleet/composition';
import FleetDetails from '~/components/organisms/fleet/details';
import FleetList from '~/components/organisms/fleet/list';
import { mapGetters } from 'vuex';

export default {
    name: 'page-planet-fleets',

    components: {
        FleetComposition,
        FleetDetails,
        FleetList,
        HangarDetails,
    },

    data() {
        return {
            selectedFleet: null,
            selectedGroup: null,
            selectedPosition: null
        }
    },

    async asyncData({ app, store }) {
        const [ fleets, groups ] = await Promise.all([
            app.$repositories.fleet.getPlanetFleets(store.state.user.currentPlanet.id),
            app.$repositories.planet.getHangarGroups(store.state.user.currentPlanet)
        ])
        return { fleets, groups };
    },

    computed: {
        ...mapGetters({
            currentPlanet: 'user/currentPlanet'
        }),

        selectedSquadron() {
            if (this.selectedPosition === null) {
                return null;
            }
            for (const s of this.selectedFleet.squadrons) {
                if (s.position.x === this.selectedPosition.x && s.position.y === this.selectedPosition.y) {
                    return s;
                }
            }
            return null;
        }
    },

    methods: {
        selectGroup(group) {
            if (this.selectedFleet !== null && this.selectedPosition !== null) {
                this.selectedGroup = group;
                this.selectedFleet.squadrons.push(Object.assign({}, {
                    shipModel: group,
                    quantity: 0,
                    position: this.selectedPosition
                }));
            }
        },

        selectPosition(position) {
            if (this.selectedSquadron !== null && this.selectedSquadron.quantity === 0) {
                this.selectedFleet.squadrons.splice(this.selectedFleet.squadrons.indexOf(this.selectedSquadron), 1);
            }
            this.selectedPosition = position;

            if (this.selectedSquadron === null) {
                if (this.selectedGroup !== null && this.selectedGroup.quantity === 0) {
                    this.groups.splice(this.groups.indexOf(this.selectedGroup), 1);
                }
                this.selectedGroup = null;
                return;
            }
            for (const g of this.groups) {
                if (g.id === this.selectedSquadron.shipModel.id) {
                    this.selectedGroup = g;
                    return;
                }
            }
            this.selectedGroup = Object.assign({}, this.selectedSquadron.shipModel, { quantity: 0 });
            this.groups.push(this.selectedGroup);
        },

        assignShips(quantity) {
            const requestedQuantity = quantity - this.selectedSquadron.quantity;

            this.selectedSquadron.quantity += requestedQuantity;
            this.selectedGroup.quantity -= requestedQuantity;
        },

        async validateQuantity(quantity) {
            this.assignShips(quantity);

            try {
                const squadron = await ((typeof this.selectedSquadron.id === 'undefined') ? this.createSquadron() : this.updateSquadron());
                const squadronIndex = this.selectedFleet.squadrons.indexOf(this.selectedSquadron);
                this.selectedFleet.squadrons[squadronIndex] = squadron;
            } catch(err) {
                this.$store.dispatch('user/addNotification', {
                    type: 'error',
                    message: err
                });
            }
        },

        createSquadron() {
            return this.$repositories.fleet.createSquadron(
                this.selectedFleet,
                this.selectedSquadron.shipModel.id,
                this.selectedSquadron.position,
                this.selectedSquadron.quantity
            );
        },

        updateSquadron() {
            return this.$repositories.fleet.updateSquadron(this.selectedFleet, this.selectedSquadron);
        }
    }
};
</script>

<style lang="less" scoped>
    #hangar-details {
        grid-column: ~"2/4";
        grid-row: ~"2/9";
    }

    #fleet-composition {
        grid-column: ~"4/7";
        grid-row: ~"2/9"
    }

    #fleet-details,
    #fleets-list {
        grid-column: ~"7/10";
        grid-row: ~"2/9";
    }
</style>
