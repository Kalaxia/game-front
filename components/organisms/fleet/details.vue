<template>
    <div id="fleet-details">
        <header>
            <h3>{{ $t('fleet.title', { fleet: fleet.id }) }}</h3>
            <div class="toolbar">
                <button class="button" v-if="fleet.location && fleet.location.player && fleet.location.player.id == currentPlayer.id" :style="{ color: factionColors['main'] }" @click="remove">{{ $t('fleet.remove') }}</button>
                <button class="button" v-if="fleet.location" :style="{ color: factionColors['main'] }" @click="move">{{ $t('fleet.move') }}</button>
                <nuxt-link :to="`/map/?id=${fleet.id}`" class="button" v-else :style="{ color: factionColors['main'] }">
                    Voir sur la carte
                </nuxt-link>
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

            <div class="ship-groups" v-if="fleet.location">
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
            <div v-else class="journey">
                <header>
                    <h3>{{ $t('fleet.statuses.traveling') }}</h3>
                </header>
                <section>
                    <div v-for="step in fleet.journey.steps" :key="step.id" :style="{ borderColor: factionColors['grey'] }">
                        <div class="location">
                            <template v-if="step.startLocation">
                                <planet-image :type="step.startLocation.type" width="32px" height="32px" />
                                <h5>{{ step.startLocation.name }}</h5>
                            </template>
                            <template v-else>
                                {{ step.startX }} - {{ step.startY }}
                            </template>
                        </div>
                        <div class="line" :style="{ borderColor: factionColors['grey'] }"></div>
                        <div class="picto">
                            <order-picto :order="step.order" :color="factionColors['white']" :size="32" />
                        </div>
                        <div class="line" :style="{ borderColor: factionColors['grey'] }"></div>
                        <div class="location">
                            <template v-if="step.endLocation">
                                <planet-image :type="step.endLocation.type" width="32px" height="32px" />
                                <h5>{{ step.endLocation.name }}</h5>
                            </template>
                            <template v-else>
                                {{ step.finalX }} - {{ step.finalY }}
                            </template>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </div>
</template>

<script>
import OrderPicto from '~/components/atoms/fleet/order-picto';
import PlanetImage from '~/components/atoms/planet/image';
import Fleet from '~/model/fleet/fleet';
import FleetData from '~/components/molecules/fleet/data';
import ShipGroup from '~/components/molecules/ship/group';
import { mapGetters } from 'vuex';

export default {
    name: 'fleet-details',

    props: {
        fleet: {
            required: true,
            validator: prop => prop instanceof Fleet || prop === null
        }
    },

    data() {
        return {
            hangarShips: [],
        };
    },

    components: {
        OrderPicto,
        FleetData,
        PlanetImage,
        ShipGroup
    },

    mounted() {
        this.$repositories.fleet.getFleetShipGroups(this.fleet);
        this.$repositories.planet.getHangarShipGroups(this.fleet.location);
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors',
            currentPlayer: 'user/currentPlayer'
        })
    },

    methods: {
        async remove() {
            if (!confirm(this.$i18n.t('fleet.confirm_removal'))) {
                return false;
            }
            await this.$repositories.fleet.removeFleet(this.fleet);
            
            this.$router.push('/fleets');
        },

        async move() {
            this.$router.push({ path: '/map', query: { id: this.fleet.id} });
        },

        transferShips(shipGroup, quantity, event) {
            if (event.ctrlKey) {
                quantity *= 5;
            }
            this.$repositories.fleet.transferShips(this.fleet, shipGroup, quantity);
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/button.less';

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


    .journey {

        & > section {
            display: flex;
            overflow-x: auto;

            & > div {
                width: 250px;
                height: 100px;
                padding: 10px 20px;
                border: 1px solid;
                border-radius: 10px;
                margin: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                & > .line {
                    flex-grow: 1;
                    border-top: 1px dashed;
                    border-bottom: 1px dashed;
                }

                & > .location {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    & > h5 {
                        margin: 5px 0px;
                    }
                }
            }
        }
    }
</style>
