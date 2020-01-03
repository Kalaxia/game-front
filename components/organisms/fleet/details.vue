<template>
    <div id="fleet-details" :style="{ borderColor: factionColors['grey'] }">
        <header>
            <h3>{{ $t('fleet.title', { fleet: fleet.id }) }}</h3>
            <div class="toolbar">
                <button class="button" v-if="fleet.place && fleet.place.planet && fleet.player && fleet.player.id == currentPlayer.id" :style="{ color: factionColors['main'] }" @click="remove">{{ $t('fleet.remove') }}</button>
                <button class="button" v-if="fleet.place && fleet.place.planet && fleet.shipGroups.length > 0" :style="{ color: factionColors['main'] }" @click="move">{{ $t('fleet.move') }}</button>
                <nuxt-link :to="`/map/?id=${fleet.id}`" class="button" :style="{ color: factionColors['main'] }">
                    Voir sur la carte
                </nuxt-link>
                <button class="button" @click="$emit('unselect')" :style="{ color: factionColors['main'] }">Déselectionner</button>
            </div>
        </header>
        <section class="cargo" v-if="cargoCapacity > 0">
            <header>
                <h4>Cargo</h4>
                <div>
                    <em>{{ cargoLoad }}</em>
                    /
                    <strong>{{ cargoCapacity }}</strong>
                </div>
            </header>
            <section>
                <div v-for="(quantity, r) in fleet.cargo" :key="r">
                    <resource-item :resource="{ name: r }" />
                    {{ quantity }}
                </div>
            </section>
        </section>
        <section class="ships">
            <h4>Escadrilles</h4>
            <div>
                <div v-for="(g, t) in squadronGroups" :key="`group-${t}`" :style="{ borderColor: factionColors['white'] }">
                    <header>
                        <ship-type :type="t" :color="factionColors['white']" :size="36" />
                        <span>
                            x{{ g.quantity }}
                        </span>
                    </header>

                    <section>
                        <div v-for="(s, i) in g.squadrons"
                            :key="`squadron-${t}-${i}`"
                            :style="{ borderColor: factionColors[(isSelected(s) ? 'main' : 'grey')] }"
                            @click="selectPosition(s)">
                            <h6>{{ s.shipModel.name }}</h6>
                            <span class="quantity">x{{ s.quantity }}</span>
                            <gauge :levels="gaugeLevels(g, s)" :background="factionColors['black']" />
                            <span class="percent">{{ Math.floor((s.quantity / g.quantity) * 100) }}%</span>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Gauge from '~/components/atoms/gauge';
import JourneyStep from '~/components/molecules/fleet/journey-step';
import OrderPicto from '~/components/atoms/fleet/order-picto';
import PlanetImage from '~/components/atoms/planet/image';
import Fleet from '~/model/fleet/fleet';
import FleetData from '~/components/molecules/fleet/data';
import ShipGroup from '~/components/molecules/ship/group';
import ShipType from '~/components/atoms/ship/type';
import ResourceItem from '~/components/atoms/resource/item';
import { mapGetters } from 'vuex';

export default {
    name: 'fleet-details',

    props: ['fleets', 'fleet', 'selectedPosition'],

    data() {
        return {
            hangarShips: [],
        };
    },

    components: {
        Gauge,
        JourneyStep,
        OrderPicto,
        FleetData,
        PlanetImage,
        ShipGroup,
        ShipType,
        ResourceItem,
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors',
            currentPlayer: 'user/currentPlayer'
        }),

        cargoLoad() {
            return Object.values(this.fleet.cargo).reduce((acc, q) => acc + q, 0);
        },

        cargoCapacity() {
            return this.fleet.squadrons.reduce(
                (acc, s) => (s.shipModel !== null && typeof s.shipModel.stats['size'] !== 'undefined') ? acc + (s.shipModel.stats['size'] * s.quantity) : acc
            , 0);
        },

        squadronGroups() {
            return this.fleet.squadrons.reduce((acc, v) => {
                if (typeof acc[v.shipModel.type] === 'undefined') {
                    acc[v.shipModel.type] = {
                        squadrons: [],
                        quantity: 0
                    };
                }
                acc[v.shipModel.type].squadrons.push(v);
                acc[v.shipModel.type].quantity += v.quantity;
                return acc;
            }, {});
        }
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
        },

        isSelected(squadron) {
            return this.selectedPosition && squadron.position.x === this.selectedPosition.x && squadron.position.y === this.selectedPosition.y;
        },

        gaugeLevels(group, squadron) {
            return [
                {
                    value: (squadron.quantity / group.quantity) * 100,
                    color: this.factionColors['main']
                }
            ];
        },

        selectPosition(squadron) {
            if (squadron.position !== this.selectedPosition) {
                this.$emit('selectPosition', squadron.position);
            }
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/button.less';

    #fleet-details {
        border: 2px solid;
        border-radius: 10px;
        padding: 10px 20px;

        & > header {
            display: flex;
            flex-direction: column-reverse;
            justify-content: space-between;

            & > h3 {
                margin: 0px;
            }

            & > .toolbar {
                display: flex;
                flex-wrap: wrap;
                align-items: flex-start;

                & > .button {
                    margin: 5px;
                }
            }
        }

        & > .cargo {
            & > header {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            & > section {
                display: flex;
                flex-wrap: wrap;

                & > div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: 10px;
                    font-size: 0.8em;

                    & > .resource-item {
                        width: 36px;
                        height: 36px;
                        margin-bottom: 5px;
                    }
                }
            }
        }

        & > .ships {
            & > div {
                display: flex;
                align-items: stretch;
                overflow: auto;

                & > div {
                    width: 80px;
                    padding: 5px 10px;
                    border-right: 1px solid;

                    & > header {
                        display: flex;
                        align-items: center;

                        & > .picto {
                            margin-right: 5px;
                        }
                    }

                    & > section {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-top: 10px;

                        & > div {
                            width: 90%;
                            margin: 5px 0px;
                            padding: 5px;
                            border: 1px solid;
                            border-radius: 5px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            & > h6 {
                                margin: 0px;
                                font-size: 0.5em;
                            }

                            & > .quantity {
                                padding: 5px 0px;
                                font-weight: bold;
                                font-size: 0.8em;
                            }

                            & > .gauge {
                                width: 90%;
                                height: 4px;
                            }

                            & > .percent {
                                padding-top: 10px;
                                font-weight: bold;
                                font-size: 0.7em;
                            }
                        }
                    }

                    &:last-child {
                        border-right: none;
                    }
                }
            }
        }
    }
</style>
