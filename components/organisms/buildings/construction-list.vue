<template>
    <div class="construction-list" :style="{ borderColor: factionColors['black'] }">
        <header :style="{ borderColor: factionColors['grey'] }">
            <template v-for="c in nextConstructions">
                <div :key="`${c.id}-${c.name}`" :style="{ color: factionColors['grey'], borderColor: factionColors['grey'] }">
                    <template v-if="isCompartment(c)">
                        <div class="compartment-image" :style="`mask-image: url('/images/buildings/${compartmentPicture(c)}'); background-color: ${factionColors['grey']}`"></div>
                        <div class="info">
                            <h5>
                                {{ $t('planet.buildings.compartment', { building: $t(`buildings.${c.building.name}`) }) }}
                            </h5>
                            <h4>{{ $t(`compartments.${c.name}.title`) }}</h4>
                        </div>
                        <div class="cost">
                            {{ c.constructionState.points }}
                            <colored-picto src="Pc_GenieCivil.png" :width="28" :height="28" :color="factionColors['grey']" />
                        </div>
                    </template>
                    <template v-else>
                        <building-image :building="c" :disableConstructionPicto="true" width="48px" :color="factionColors['grey']" />
                        <div class="info">
                            <h5>{{ $t('planet.building') }}</h5>
                            <h4>{{ $t(`buildings.${c.name}`) }}</h4>
                        </div>
                        <div class="cost">
                            {{ c.constructionState.points }}
                            <colored-picto src="Pc_GenieCivil.png" :width="28" :height="28" :color="factionColors['grey']" />
                        </div>
                    </template>
                </div>
            </template>
        </header>
        <current-construction v-if="currentConstruction" :construction="currentConstruction" />
        <footer :style="{ borderColor: factionColors['white'] }">
            <div v-if="currentConstruction">
                <div :style="{ color: factionColors['grey'] }">
                    {{ $t('planet.buildings.total_points') }}
                    <span>{{ totalPoints }}</span>
                    <colored-picto src="Pc_GenieCivil.png" :width="28" :height="28" :color="factionColors['grey']" />
                </div>
                <div>
                    {{ $t('planet.buildings.remaining_points') }}
                    <span>{{ remainingPoints }}</span>
                    <colored-picto src="Pc_GenieCivil.png" :width="28" :height="28" :color="factionColors['white']" />
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import BuildingImage from '~/components/atoms/building/image';
import ColoredPicto from '~/components/atoms/colored-picto';
import CurrentConstruction from '~/components/molecules/building/current-construction';
import { mapGetters } from 'vuex';

export default {
    name: 'building-construction-list',

    components: {
        BuildingImage,
        ColoredPicto,
        CurrentConstruction
    },

    computed: {
        ...mapGetters({
            currentPlanet: 'user/currentPlanet',
            factionColors: 'user/factionColors',
        }),

        constructions() {
            return this.currentPlanet.buildings.map(b => {
                const a = (b.status === 'constructing') ? [b] : [];

                return a.concat(b.compartments.filter(c => c.status === 'constructing'));
            }).reduce((acc, a) => acc.concat(a), [])
            .sort((a, b) => a.createdAt > b.createdAt);
        },

        currentConstruction() {
            return Array.from(this.constructions).shift();
        },

        nextConstructions() {
            return this.constructions.slice(1, this.constructions.length);
        },

        totalPoints() {
            return this.constructions.reduce((acc, c) => acc + c.constructionState.points, 0);
        },

        remainingPoints() {
            return this.totalPoints - this.currentConstruction.constructionState.current_points;
        }
    },

    methods: {
        isCompartment(element) {
            return typeof element.building !== 'undefined';
        },

        compartmentPicture(compartment) {
            return this.$resources.buildings[compartment.building.name].compartments.filter(c => c.name === compartment.name).shift().picture;
        }
    }
}
</script>

<style lang="less" scoped>
    .construction-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        border: 2px solid;
        border-radius: 10px;
        padding: 10px 5%;

        & > header {
            width: 90%;
            margin: 0px auto;
            border-bottom: 1px solid;

            & > div {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-top: 1px solid;
                padding: 10px;

                & > .compartment-image {
                    width: 48px;
                    height: 48px;
                    mask-repeat: no-repeat;
                    mask-size: cover;
                }

                & > .building-image {
                    width: 48px;
                    height: 48px;
                }

                & > .info {
                    flex-basis: 60%;
                    font-variant: small-caps;

                    & > h4 {
                        margin: 0px;
                    }

                    & > h5 {
                        margin: 0px;
                    }
                }

                & > .cost {
                    display: flex;
                    align-items: center;
                    font-weight: bold;
                    font-size: 1.1em;

                    & > .picto {
                        margin-left: 5px;
                    }
                }
            }
        }

        & > .current-construction {
            width: 90%;
            margin: 0px auto;
        }

        & > footer {
            width: 90%;
            border-top: 2px solid;
            margin: 20px auto;
            padding-top: 10px;
            display: flex;
            justify-content: flex-end;

            & > div {
                & > div {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    font-size: 1.1em;
                    font-variant: small-caps;
                    padding: 5px 0px;

                    & > span {
                        width: 50px;
                        text-align: right;
                    }

                    & > .picto {
                        margin-left: 5px;
                    }
                }
            }
        }
    }
</style>
