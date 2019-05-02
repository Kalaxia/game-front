<template>
    <nuxt-link to="/buildings/shipyard" id="menu-constructing-ships">
        <header>
            <div>
                <colored-picto src="Shipyard_64px.png" color="#E0E0E0" :width="18" :height="18" />
            </div>
        </header>
        <section>
            <template v-if="constructingShips">
                <div class="quantity">
                    <ship-type :type="constructingShips.model.type" :color="factionColors['white']" :size="24" />
                    <sup>x{{ constructingShips.quantity }}</sup>
                </div>
                <gauge :levels="gaugeLevels" :background="factionColors['black']" />
                <div class="points">
                    <strong>{{ constructingShips.constructionState.current_points }}</strong>
                    <sup>/ {{ constructingShips.constructionState.points }}</sup>
                </div>
            </template>
            <template v-else>
                <div class="call-to-action">
                    <button class="button">
                        <colored-picto src="G_P_B_64px.png" :color="factionColors['mainLight']" :width="24" :height="24" />
                    </button>
                </div>
            </template>
        </section>
    </nuxt-link>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import Gauge from '~/components/atoms/gauge';
import ShipType from '~/components/atoms/ship/type';
import { mapGetters } from 'vuex';

export default {
    name: 'constructing-ships-menu',

    props: ['constructingShips'],

    components: {
        ColoredPicto,
        Gauge,
        ShipType
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors',
        }),

        gaugeLevels () {
            return [
                {
                    value: (this.constructingShips.constructionState.current_points / this.constructingShips.constructionState.points) * 100,
                    color: this.factionColors['white']
                }
            ];
        }
    }
}
</script>

<style lang="less">
    #menu-constructing-ships {
        & > section {
            width: 50px;

            & > .call-to-action {
                display: flex;
                justify-content: center;
                margin-top: 5px;

                & > .button {
                    padding: 5px;
                }
            }

            & > .quantity {
                display: flex;
                justify-content: flex-end;
                font-size: 0.9em;
            }

            & > .gauge {
                margin-top: 2px;
                width: 100%;
                height: 5px;
                border: 1px solid white;
            }

            & > .points {
                display: flex;
                justify-content: center;
                margin-top: 2px;

                & > strong {
                    padding-right: 2px;
                }

                & > sup {
                    font-size: 0.7em;
                }
            }
        }
    }
</style>
