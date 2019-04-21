<template>
    <div id="constructing-ships" :style="{ borderColor: factionColors['grey'] }">
        <div class="construction-list">
            <section>
                <div v-for="(shipGroup, index) in constructingShips" :key="`${index}-${shipGroup.model.id}`" :style="{ borderColor: factionColors['grey'] }">
                    <div class="type">
                        <ship-type :type="shipGroup.model.type" :color="factionColors[(index === 0) ? 'white' : 'grey']" :size="24" />
                        <sup>x{{ shipGroup.quantity }}</sup>
                    </div>
                    <div class="name">
                        <h6>{{ $t(`ships.types.${shipGroup.model.type}`) }}</h6>
                        <h5>{{ shipGroup.model.name }}</h5>
                    </div>
                    <div class="points">
                        <colored-picto src="Pc_GenieMilitaire.png" :color="factionColors['white']" :width="18" :height="18" />
                        <strong>{{ shipGroup.constructionState.current_points }}</strong>
                        <sup>/{{ shipGroup.constructionState.points }}</sup>
                    </div>
                </div>
            </section>
            <footer :style="{ borderColor: factionColors['white'] }">
                <span>{{ $t('total') }} :</span>
                <strong>{{ totalPoints }}</strong>
                <colored-picto src="Pc_GenieMilitaire.png" :color="factionColors['white']" :width="24" :height="24" />
            </footer>
        </div>
        <div class="next-queues">
            <div v-if="constructingShips.length >= 2" :style="{ borderColor: factionColors['white'] }">
                <header>
                    <h3>{{ $t('ships.next_production') }}</h3>
                </header>
                <section>
                    <div>
                        <strong>{{ nextProduction.quantity }} x</strong>
                        <h6>{{ $t(`ships.types.${nextProduction.model.type}`) }}</h6>
                        <h5>{{ nextProduction.model.name }}</h5>
                    </div>
                    <ship-type :type="nextProduction.model.type" :color="factionColors['white']" :size="84" />
                </section>
                <footer>
                    <div class="levels">
                        <strong>{{ nextProduction.constructionState.current_points }}</strong>
                        <div>
                            <span>/ {{ nextProduction.constructionState.points }}</span>
                            <colored-picto src="Pc_GenieMilitaire.png" :color="factionColors['white']" :width="18" :height="18" />
                        </div>
                    </div>
                    <gauge :levels="gaugeLevels" :background="factionColors['black']" :style="{ borderColor: factionColors['white'] }" />
                </footer>
            </div>
            <div :style="{ borderColor: factionColors['white'] }">
                <header>
                    <h3 v-html="$t('ships.current_production')"></h3>
                </header>
                <section>
                    <div>
                        <strong>{{ currentProduction.quantity }} x</strong>
                        <h6>{{ $t(`ships.types.${currentProduction.model.type}`) }}</h6>
                        <h5>{{ currentProduction.model.name }}</h5>
                    </div>
                    <ship-type :type="currentProduction.model.type" :color="factionColors['white']" :size="84" />
                </section>
                <footer>
                    <div class="levels">
                        <strong>{{ currentProduction.constructionState.current_points }}</strong>
                        <div>
                            <span>/ {{ currentProduction.constructionState.points }}</span>
                            <colored-picto src="Pc_GenieMilitaire.png" :color="factionColors['white']" :width="18" :height="18" />
                        </div>
                    </div>
                    <gauge :levels="gaugeLevels" :background="factionColors['black']" :style="{ borderColor: factionColors['white'] }" />
                    <div class="percent">
                        {{ (currentProduction.constructionState.current_points / currentProduction.constructionState.points) * 100 }}%
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import Gauge from '~/components/atoms/gauge';
import ShipType from '~/components/atoms/ship/type';
import { mapGetters } from 'vuex';

export default {
    name: 'constructing-ships',
    
    props: ['constructingShips'],

    components: {
        ColoredPicto,
        Gauge,
        ShipType
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        currentProduction () {
            return this.constructingShips[0];
        },

        nextProduction () {
            return this.constructingShips[1];
        },

        gaugeLevels() {
            return [
                {
                    value: (this.currentProduction.constructionState.current_points / this.currentProduction.constructionState.points) * 100,
                    color: this.factionColors['white']
                }
            ]
        },

        totalPoints () {
            let total = 0;
            for (const shipGroup of this.constructingShips) {
                total += shipGroup.constructionState.points - shipGroup.constructionState.current_points;
            }
            return total;
        }
    }
}
</script>

<style lang="less">
    #constructing-ships {
        display: flex;
        border: 2px solid;
        border-radius: 10px;
        margin-left: 20px;
        padding: 10px 20px;

        & > .construction-list {
            display: flex;
            flex-grow: 1;
            flex-direction: column;

            & > section {
                display: flex;
                flex-grow: 1;
                flex-direction: column-reverse;

                & > div {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 5px 10px;
                    border-top: 1px solid;

                    & > .type {
                        display: flex;
                    }

                    & > .name {
                        & > h5, & > h6 {
                            margin: 0px;
                        }
                    }

                    & > .points {
                        display: flex;

                        & > strong {
                            margin-left: 10px;
                        }
                    }
                }
            }

            & > footer {
                margin-top: 10px;
                border-top: 2px solid;
                padding: 10px 20px;
                display: flex;
                justify-content: center;

                & > strong {
                    padding: 0px 2px 0px 5px;
                }
            }
        }

        & > .next-queues {
            display: flex;
            flex-direction: column;
            padding: 10px 0px 10px 40px;

            & > div {
                border: 1px solid;
                border-radius: 10px;
                padding: 10px 30px 20px 30px;

                &:last-child {
                    margin-top: 5px;
                }

                & > header {
                    & > h3 {
                        margin: 0px;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        font-variant: small-caps;

                        strong {
                            font-size: 1.4em;
                        }
                    }
                }

                & > section {
                    display: flex;
                    margin-top: 10px;
                    justify-content: center;

                    & > div:first-child {
                        font-variant: small-caps;
                        margin-right: 10px;
                        & > strong {
                            font-size: 2.5em;
                        }

                        & > h5 {
                            font-size: 1em;
                            margin: 0px;
                        }

                        & > h6 {
                            font-size: 0.8em;
                            margin: 0px;
                        }
                    }
                }

                & > footer {
                    & > .levels {
                        margin-top: 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;

                        & > div {
                            display: flex;
                            align-items: flex-end;

                            & > span {
                                padding-right: 5px;
                                font-size: 0.7em;
                            }
                        }
                    }

                    & > .gauge {
                        margin-top: 5px;
                        border: 1px solid;
                        height: 15px;
                    }

                    & > .percent {
                        margin-top: 20px;
                        text-align: center;
                        font-size: 3em;
                    }
                }
            }
        }
    }
</style>
