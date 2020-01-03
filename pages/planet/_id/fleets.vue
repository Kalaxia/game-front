<template>
    <div>
        <hangar-details
            :groups="groups"
            :selectedGroup="selectedGroup"
            @selectGroup="selectGroup($event)" />

        <template v-if="!selectedFleet">
            <div id="fleets-list">
                <fleet-list
                    type="orbiting"
                    :fleets="fleets"
                    @selectFleet="selectFleet($event)"
                    @createFleet="fleets.push($event)" />
                <fleet-list v-if="comingFleets.length > 0"
                    type="coming"
                    :fleets="comingFleets"
                    @selectFleet="selectFleet($event)" />
                <fleet-list v-if="leavingFleets.length > 0"
                    type="leaving"
                    :fleets="leavingFleets"
                    @selectFleet="selectFleet($event)" />
            </div>
        </template>
        <template v-else>
            <div v-if="selectedFleet.journey" id="fleet-journey-details">
                <fleet-journey-step :step="selectedFleet.journey.currentStep" />
            </div>
            <div v-else-if="selectedFleet.place.planet" id="fleet-location">
                <h4>{{ $t('fleet.statuses.idle', { location: selectedFleet.place.planet.name }) }}</h4>
                <planet-image :type="selectedFleet.place.planet.type" :width="64" :height="64" @click.native="goToPlanet(selectedFleet.place.planet)" />
                <fleet-cargo-manager v-if="cargoCapacity > 0 && !selectedGroup" :fleet="selectedFleet" :cargo="selectedFleet.cargo" @sendResources="sendResources($event)" @expandResourceForm="expandResourceForm = $event" />
            </div>
            <fleet-composition
                v-if="!expandResourceForm"
                :fleet="selectedFleet"
                :selectedPosition="selectedPosition"
                :selectedGroup="selectedGroup"
                @selectPosition="selectPosition($event)"
                @assignShips="assignShips($event)"
                @validateQuantity="validateQuantity($event)" />
            <fleet-details
                :fleets="fleets"
                :fleet="selectedFleet"
                :selectedPosition="selectedPosition"
                @selectPosition="selectPosition($event)"
                @selectFleet="selectFleet($event)"
                @unselect="selectedFleet = null" />
        </template>
    </div>
</template>

<script>
import HangarDetails from '~/components/organisms/planet/hangar-details';
import PlanetImage from '~/components/atoms/planet/image';
import FleetComposition from '~/components/organisms/fleet/composition';
import FleetDetails from '~/components/organisms/fleet/details';
import FleetJourneyStep from '~/components/molecules/fleet/journey-step';
import FleetList from '~/components/organisms/fleet/list';
import FleetCargoManager from '~/components/organisms/fleet/cargo-manager';
import { mapGetters } from 'vuex';

export default {
    name: 'page-planet-fleets',

    components: {
        FleetCargoManager,
        FleetComposition,
        FleetDetails,
        FleetJourneyStep,
        FleetList,
        HangarDetails,
        PlanetImage
    },

    data() {
        return {
            selectedFleet: null,
            selectedGroup: null,
            selectedPosition: null,
            expandResourceForm: false,
        };
    },

    async asyncData({ app, store }) {
        const [ fleets, comingFleets, leavingFleets, groups ] = await Promise.all([
            app.$repositories.fleet.getPlanetFleets(store.state.user.currentPlanet.id),
            app.$repositories.fleet.getComingFleets(store.state.user.currentPlanet.id),
            app.$repositories.fleet.getLeavingFleets(store.state.user.currentPlanet.id),
            app.$repositories.planet.getHangarGroups(store.state.user.currentPlanet)
        ])
        return { fleets, comingFleets, leavingFleets, groups };
    },

    computed: {
        ...mapGetters({
            currentPlayer: 'user/currentPlayer',
            currentPlanet: 'user/currentPlanet',
            factionColors: 'user/factionColors',
            storedResources: 'user/storedResources',
            storedResource: 'user/getStoredResource'
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
        },

        cargoCapacity() {
            return this.selectedFleet.squadrons.reduce(
                (acc, s) => (typeof s.shipModel.stats['size'] !== 'undefined') ? acc + (s.shipModel.stats['size'] * s.quantity) : acc
            , 0);
        },
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

        async selectFleet(fleet) {
            if (fleet.squadrons.length === 0 && fleet.player.id === this.currentPlayer.id) {
                await this.$repositories.fleet.getSquadrons(fleet);
            }
            this.selectedFleet = fleet;
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
                this.$store.dispatch('user/addActionNotification', {
                    isError: true,
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
        },

        async sendResources(data) {
            try {
                await this.$repositories.fleet[(data.planetToFleet === true) ? 'loadCargo' : 'unloadCargo'](this.selectedFleet, {
                    planet: this.currentPlanet,
                    resource: data.resource,
                    quantity: data.quantity
                });
            } catch(err) {
                this.$store.dispatch('user/addActionNotification', {
                    isError: true,
                    message: err
                });
            }
            this.$store.commit('user/updateStorageResource', {
                resource: data.resource,
                quantity: (data.planetToFleet === true) ? -data.quantity : data.quantity
            });
            if (typeof this.selectedFleet.cargo[data.resource] === 'undefined') {
                this.selectedFleet.cargo[data.resource] = 0;
            }
            this.selectedFleet.cargo[data.resource] += (data.planetToFleet === true) ? data.quantity : -data.quantity
            if (this.selectedFleet.cargo[data.resource] === 0) {
                delete this.selectedFleet.cargo[data.resource];
            }
        }
    }
};
</script>

<style lang="less" scoped>
    #hangar-details {
        grid-column: ~"2/4";
        grid-row: ~"2/9";
    }

    #fleet-journey-details,
    #fleet-location {
        grid-column: ~"4/7";
        grid-row: ~"2/5";
        margin: auto;
    }

    #fleet-location {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #fleet-composition {
        grid-column: ~"4/7";
        grid-row: ~"5/9";
    }

    #fleet-details,
    #fleets-list {
        grid-column: ~"7/10";
        grid-row: ~"2/9";
    }

    #fleets-list {
        & > .fleets-list {
            margin-top: 10px;
        }
    }
</style>
