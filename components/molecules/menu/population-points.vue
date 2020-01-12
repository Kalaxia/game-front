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
                    <colored-picto src="G_P_Char_BK_64px.png" color="#E0E0E0" :width="16" :height="16" />
                    <span>x{{ population }}</span>
                </div>
            </div>
        </section>
    </nuxt-link>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';

export default {
    name: 'menu-population-points',

    props: ['planet'],

    components: {
        ColoredPicto
    },

    computed: {
        population() {
            return Math.floor(this.planet.population / 1000000);
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
                        font-size: 0.8em;
                        padding-left: 5px;
                    }
                }
            }
        }
    }
</style>
