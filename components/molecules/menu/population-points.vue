<template>
    <nuxt-link :to="`/planet/${planet.id}/population`" v-if="planet" id="menu-population-points">
        <header>
            <div>
                <colored-picto src="G_P_Char_BK_64px.png" color="#E0E0E0" :width="18" :height="18" />
            </div>
        </header>
        <section>
            <div class="points">
                <div v-for="(value, setting) in planet.settings" :key="setting">
                    <colored-picto :src="settingsPicto(setting)" color="white" :width="20" :height="20" />
                    <span>x{{ value }}</span>
                </div>
            </div>
            <div class="population">
                <div>
                    <colored-picto src="G_P_Char_BK_64px.png" color="#E0E0E0" :width="12" :height="12" />
                    <span>x{{ population }}</span>
                </div>
                <div>
                    <colored-picto src="G_P_Char_BK_64px.png" color="#E0E0E0" :width="12" :height="12" />
                    <span>{{ unaffectedPoints }}</span>
                </div>
                <div>
                    <colored-picto src="G_P_Char_BK_64px.png" color="#E0E0E0" :width="12" :height="12" />
                    <span>{{ growth }}%</span>
                </div>
            </div>
            <div class="public-order">
                <header>
                    <colored-picto src="G_P_Char_BK_64px.png" color="#E0E0E0" :width="16" :height="16" />
                </header>
                <section>
                    <div class="gauge" :style="{ borderColor: factionColors['white'] }">
                        <div :style="{ flexBasis: `${planet.publicOrder}%`, backgroundColor: publicOrderColor }"></div>
                    </div>
                </section>
            </div>
        </section>
    </nuxt-link>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import { mapGetters } from 'vuex';

export default {
    name: 'menu-population-points',

    props: ['planet'],

    components: {
        ColoredPicto
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        population() {
            return Math.floor(this.planet.population / 1000000);
        },

        growth() {
            return (this.planet.populationGrowth * 100).toFixed(1);
        },

        unaffectedPoints() {
            return this.population - Object.values(this.planet.settings).reduce((acc, v) => acc + v, 0);
        },

        publicOrderColor() {
            return '#68BB82';
        }
    },

    methods: {
        settingsPicto(setting) {
            return {
                services_points: 'Pc_Services.png',
                building_points: 'Pc_GenieCivil.png',
                research_points: 'Pc_Recherche.png',
                military_points: 'Pc_GenieMilitaire.png'
            }[setting];
        },
    }
}
</script>

<style lang="less" scoped>
    #menu-population-points {
        & > section {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            & > .points {
                max-width: 120px;
                display: flex;
                flex-wrap: wrap;

                & > div {
                    display: flex;
                    margin: 5px;
                    align-items: center;

                    & > span {
                        font-size: 0.8em;
                        padding-left: 5px;
                    }
                }
            }

            & > .population {
                & > div {
                    margin: 5px;
                    display: flex;
                    align-items: center;

                    & > span {
                        font-size: 0.7em;
                        padding-left: 5px;
                    }
                }
            }

            & > .public-order {
                display: flex;
                flex-direction: column;
                align-items: center;
                align-self: stretch;
                margin-left: 15px;
                margin-bottom: 5px;

                & > section {
                    flex-grow: 1;
                    margin-top: 2px;

                    & > .gauge {
                        width: 10px;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        border: 1px solid white;
                        border-radius: 5px;
                        overflow: hidden;
                    }

                }
            }
        }
    }
</style>
