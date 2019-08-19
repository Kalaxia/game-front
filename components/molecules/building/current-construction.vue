<template>
    <div class="current-construction">
        <h3>{{ $t('planet.buildings.constructing') }}</h3>
        <header>
            <building-image v-if="!isCompartment" :building="construction" :disableConstructionPicto="true" width="48px" :color="factionColors['white']" />
            <div v-else class="compartment-image" :style="`mask-image: url('/images/buildings/${compartmentPicture}'); background-color: ${factionColors['white']}`"></div>
            <div class="info">
                <h5>{{ label }}</h5>
                <h4>{{ name }}</h4>
            </div>
            <div class="cost">
                {{ construction.constructionState.points }}
                <colored-picto src="Pc_GenieCivil.png" :width="28" :height="28" :color="factionColors['white']" />
            </div>
        </header>
        <section>
            <gauge :levels="gaugeLevels" :background="factionColors['black']" />
        </section>
        <footer>
            <div class="progress" :style="{ color: factionColors['grey'] }">
                <sup :style="{ color: factionColors['white'] }">
                    {{ construction.constructionState.current_points }}
                    <colored-picto src="Pc_GenieCivil.png" :width="36" :height="36" :color="factionColors['white']" />
                </sup>
                /
                <sub>
                    {{ construction.constructionState.points }}
                    <colored-picto src="Pc_GenieCivil.png" :width="24" :height="24" :color="factionColors['grey']" />
                </sub>
            </div>

            <div class="percent">
                {{ percent }}%
            </div>
        </footer>
    </div>
</template>

<script>
import BuildingImage from '~/components/atoms/building/image';
import ColoredPicto from '~/components/atoms/colored-picto';
import Gauge from '~/components/atoms/gauge';
import { mapGetters } from 'vuex';

export default {
    name: 'current-construction',

    props: ['construction'],

    components: {
        BuildingImage,
        ColoredPicto,
        Gauge
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        isCompartment() {
            return typeof this.construction.building !== 'undefined';
        },

        name() {
            return this.$i18n.t(this.isCompartment ? `compartments.${this.construction.name}.title` : `buildings.${this.construction.name}`);
        },

        label() {
            return (this.isCompartment
                ? this.$i18n.t('planet.buildings.compartment', { building: this.$i18n.t(`buildings.${this.construction.building.name}`) })
                : this.$i18n.t('planet.building'));
        },

        compartmentPicture() {
            return this.$resources.buildings[this.construction.building.name].compartments.filter(c => c.name === this.construction.name).shift().picture;
        },

        gaugeLevels() {
            return [
                {
                    value: this.percent,
                    color: this.factionColors['white']
                }
            ];
        },

        percent() {
            return Math.floor((this.construction.constructionState.current_points / this.construction.constructionState.points) * 100);
        }
    }
}
</script>

<style lang="less" scoped>
    .current-construction {
        & > h3 {
            font-variant: small-caps;
        }

        & > header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;

            & > .info {
                font-variant: small-caps;
                flex-basis: 60%;

                & > h4 {
                    margin: 0;
                }

                & > h5 {
                    margin: 0px;
                }
            }

            & > .cost {
                display: flex;
                align-items: center;
                font-size: 1.1em;
                font-weight: bold;

                & > .picto {
                    margin-left: 5px;
                }
            }
        }

        & > section {
            & > .gauge {
                width: 100%;
                height: 15px;
            }
        }

        & > footer {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-top: 20px;

            & > .progress  {
                display: flex;
                & > sup {
                    display: flex;
                    align-items: center;
                    font-size: 1.2em;
                }

                & > sub {
                    display: flex;
                    align-items: center;
                }
            }

            & > .percent {
                font-size: 1.5em;
                font-weight: bold;
            }
        }
    }
</style>