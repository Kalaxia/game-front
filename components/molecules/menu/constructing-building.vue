<template>
    <nuxt-link to="/buildings" id="menu-constructing-building">
        <header>
            <div>
                <colored-picto src="G_P_B_64px.png" :color="factionColors['white']" :width="18" :height="18" />
            </div>
        </header>
        <section>
            <template v-if="building">
                <div class="building">
                    <colored-picto :src="buildingPicto" :color="factionColors['white']" :width="24" :height="24" />
                </div>
                <gauge :levels="gaugeLevels" :background="factionColors['black']" />
                <div class="points">
                    <strong>{{ building.construction_state.current_points }}</strong>
                    <sup>/ {{ building.construction_state.points }}</sup>
                </div>
            </template>
            <template v-else>
                <div class="call-to-action">
                    <button class="button">
                        <colored-picto :src="buildingPicto" :color="factionColors['mainLight']" :width="24" :height="24" />
                    </button>
                </div>
            </template>
        </section>
    </nuxt-link>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import Gauge from '~/components/atoms/gauge';
import { mapGetters } from 'vuex';

export default {
    name: 'menu-constructing-building',

    props: ['building'],

    components: {
        ColoredPicto,
        Gauge
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        buildingPicto () {
            return 'G_P_B_64px.png';
        },

        gaugeLevels () {
            return [
                {
                    value: (this.building.construction_state.current_points / this.building.construction_state.points) * 100,
                    color: this.factionColors['white']
                }
            ];
        }
    }
}
</script>

<style lang="less" scoped>
    #menu-constructing-building {
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

            & > .building {
                display: flex;
                justify-content: center;
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
