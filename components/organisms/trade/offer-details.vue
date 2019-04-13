<template>
    <div id="offer-details" :style="{ borderColor: factionColors['main'] }">
        <div>
            <div class="offer-owner border-bottom">
                <div class="player">
                    <player-avatar :player="offer.location.player" :width="48" :height="48" :disableBorder="true" />
                    <em>{{ $t(`trade.${offer.location.player.gender}_seller`) }}</em>
                    <strong :style="{ color: offer.location.player.faction.colors['main'] }">{{ playerPseudo(offer.location.player) }}</strong>
                </div>
                <div class="planet">
                    <planet-picto :type="offer.location.type" :width="48" :height="48" />
                    <em>{{ $t('trade.planet') }}</em>
                    <strong>{{ offer.location.name }}</strong>
                    <strong><planet-coords :planet="offer.location" /></strong>
                </div>
            </div>
            <div class="planet">
                <planet-image :type="offer.location.type" :width="48" :height="48" />
            </div>
            <div class="line"></div>
            <div class="lots-picto">
                <colored-picto src="trade/Lots.svg" color="white" width="18" height="18" />
            </div>
            <div class="line"></div>
            <template v-if="currentPlayer.id !== offer.location.player.id">

                <div class="planet">
                    <planet-image :type="currentPlanet.type" :width="48" :height="48" />
                </div>
                <div class="offer-owner border-top">
                    <div class="player">
                        <player-avatar :player="currentPlayer" :width="48" :height="48" :disableBorder="true" />
                        <em>{{ $t(`trade.${currentPlayer.gender}_buyer`) }}</em>
                        <strong :style="{ color: currentPlayer.faction.colors['main'] }">{{ playerPseudo(currentPlayer) }}</strong>
                    </div>
                    <div class="planet">
                        <planet-picto :type="currentPlanet.type" :width="48" :height="48" />
                        <em>{{ $t('trade.planet') }}</em>
                        <strong>{{ currentPlanet.name }}</strong>
                        <strong><planet-coords :planet="currentPlanet" /></strong>
                    </div>
                </div>
            </template>
        </div>
        <div>
            <div class="stock">
                <h5>
                    <resource-item :resource="{ name: offer.resource }" width="24px" height="24px" />
                    <span>{{ $t('trade.stock') }}</span>
                </h5>
                <gauge :levels="gaugeLevels" :background="gaugeBackground" />
                <p :style="{ color: resourceColor }">
                    <span v-if="isExcessing">{{ $t('trade.excessing_resource') }}</span>
                    <span v-else>{{ getStoredResource(offer.resource) + (nbLots * offer.lotQuantity) }}/<strong>{{ currentPlanet.storage.capacity }}</strong></span>
                </p>
            </div>
            <div class="nb-lots">
                <gauge-selector
                    :min="1"
                    :initialValue="nbLots"
                    :max="offer.quantity / offer.lotQuantity"
                    color="white"
                    @change="nbLots = $event"
                    />
                <p>
                    <colored-picto src="trade/Lot.svg" :width="16" :height="16" color="white" />
                    <span>= {{ offer.lotQuantity }}</span>
                    <resource-item :resource="{ name: offer.resource }" width="16px" height="16px" /> 
                </p>
            </div>
            <div class="recap">
                <div class="quantity">
                    <span>{{ nbLots * offer.lotQuantity }}</span>
                    <resource-item :resource="{ name: offer.resource }" width="18px" height="18px" />
                </div>
                <div class="price">
                    <span>{{ nbLots * offer.lotQuantity * offer.price }}</span>
                    <colored-picto src="G_P_Mon_64px.png" color="white" :width="26" :height="26" />
                </div>
            </div>
            <div class="actions">
                <button v-if="currentPlayer.id === offer.location.player.id" @click="$emit('cancelOffer')" class="button big" :style="{ color: factionColors['main'] }">{{ $t('trade.cancel_offer') }}</button>
                <button v-else @click="$emit('acceptOffer', nbLots)" class="button big" :style="{ color: factionColors['main'] }">{{ $t('trade.accept_offer') }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import Gauge from '~/components/atoms/gauge';
import GaugeSelector from '~/components/atoms/gauge-selector';
import PlayerAvatar from '~/components/atoms/player/avatar';
import PlanetPicto from '~/components/atoms/planet/picto';
import PlanetImage from '~/components/atoms/planet/image';
import PlanetCoords from '~/components/atoms/planet/coords';
import ResourceItem from '~/components/atoms/resource/item';
import { shadeColor } from '~/lib/colors';
import { mapGetters } from 'vuex';

export default {
    name: 'offer-details',
    
    props: ['offer'],

    data() {
        return {
            nbLots: 1
        };
    },

    components: {
        ColoredPicto,
        Gauge,
        GaugeSelector,
        PlayerAvatar,
        PlanetCoords,
        PlanetImage,
        PlanetPicto,
        ResourceItem,
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors',
            currentPlayer: 'user/currentPlayer',
            currentPlanet: 'user/currentPlanet',
            getStoredResource: 'user/getStoredResource',
        }),

        resourceColor() {
            return this.$resources.resources[this.offer.resource].color;
        },

        gaugeLevels() {
            return [
                {
                    value: this.getStoredResource(this.offer.resource) / this.currentPlanet.storage.capacity * 100,
                    color: this.resourceColor
                },
                {
                    value: this.nbLots * this.offer.lotQuantity / this.currentPlanet.storage.capacity * 100,
                    color: shadeColor(this.resourceColor, '-0.2')
                },
            ]
        },

        gaugeBackground() {
            return shadeColor(this.resourceColor, '-0.4');
        },

        isExcessing() {
            return  (this.nbLots * this.offer.lotQuantity) + this.getStoredResource(this.offer.resource) > this.currentPlanet.storage.capacity;
        }
    },

    methods: {
        playerPseudo(player) {
            return (player.id === this.currentPlayer.id) ? this.$i18n.t('trade.yourself') : player.pseudo;
        }
    }
}
</script>

<style lang="less">
    @import '~less/atoms/button.less';

    #offer-details {
        padding: 10px 20px;
        border-radius: 10px;
        border: 1px solid;
        display: flex;
        justify-content: space-between;

        & > div {
            flex-basis: 45%;
            display: flex;
            flex-direction: column;
            align-items: center;

            &:first-child {
                & > .offer-owner {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;

                    &.border-bottom {
                        border-bottom: 2px solid white;
                        border-radius: 0px 0px 20px 20px;
                        padding: 0px 10px 10px 10px;
                        margin-bottom: 10px;
                    }

                    &.border-top {
                        border-top: 2px solid white;
                        border-radius: 20px 20px 0px 0px;
                        padding: 10px 10px 0px 10px;
                        margin-top: 10px;
                    }

                    & > .player,
                    & > .planet {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                }

                & > .planet {
                    border: 2px solid white;
                    border-radius: 50%;
                    max-height: 48px;
                }

                & > .lots-picto {
                    border: 1px solid white;
                    padding: 5px;
                    background-color: black;
                    border-radius: 50%;
                }

                & > .line {
                    width: 2px;
                    flex-grow: 1;
                    border-left: 2px dashed white;
                }
            }
            
            &:last-child {
                display: flex;
                flex-direction: column;

                & > .stock {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    & > h5 {
                        display: flex;
                        justify-content: center;
                        align-items: flex-end;
                        margin: 5px 0px;

                        & > span {
                            margin-left: 5px;
                            font-variant: small-caps;
                            font-size: 1.2em;
                            font-weight: normal;
                        }
                    }

                    & > .gauge {
                        width: 100%;
                        height: 10px;
                    }

                    & > p {
                        margin: 2px 0px;
                    }
                }

                & > .nb-lots {
                    width: 100%;

                    & > .gauge-selector {
                        width: 100%;
                    }

                    & > p {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        & > span {
                            margin: 0px 2px 0px 5px;
                            font-size: 0.8em;
                        }
                    }
                }

                & > .recap {
                    border-right: 1px solid white;
                    padding-right: 10px;
                    border-radius: 0px 10px 10px 0px;
                    margin-top: 10px;

                    & > .quantity,
                    & > .price {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        margin: 5px 0px;

                        & > span {
                            font-size: 1.2em;
                            font-variant: small-caps;
                            margin-right: 5px;
                        }
                    }
                }

                & > .actions {
                    margin-top: 20px;
                }
            }
        }
    }
</style>
