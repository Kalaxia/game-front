<template>
    <div id="population-points">
        <header>
            <h3 :style="{ color: factionColor }">Points de population</h3>
            <p>
                Les points de population répartissent la force de travail de votre peuple dans les différents secteurs d'activité de votre planète.
                Vous disposez d'un nombre de points proportionnel à la démographie planétaire.
                Ces points sont produits chaque heure et sont directement dépensés dans les activités correspondantes.
            </p>
        </header>
        <section>
            <div v-for="(value, setting) in planet.settings" :key="setting" >
                <gauge-selector :min="0"
                    :max="population"
                    :initialValue="value"
                    :available="availablePoints"
                    :color="factionColor"
                    @change="changeSetting(setting, $event)"
                    @stop="updateSetting(setting, $event)"/>
                <div>
                    <span :style="{ color: factionColor }">{{ value }}</span>
                    <colored-picto :src="settingsPicto(setting)" color="white" :width="32" :height="32" />
                </div>
            </div>
        </section>
        <footer>
            <p>
                <span>Points disponibles : </span>
                <strong :style="{ color: factionColor }">{{ availablePoints }}</strong>
                <colored-picto src="G_P_Clas_BK_64px.png" color="white" :width="32" :height="32" />
            </p>
        </footer>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import GaugeSelector from '~/components/atoms/gauge-selector';

export default {
    name: 'population-points',

    components: {
        ColoredPicto,
        GaugeSelector,
    },

    computed: {
        planet() {
            return this.$store.state.user.currentPlanet;
        },

        availablePoints() {
            let availablePoints = this.population;

            for (const setting in this.planet.settings) {
                availablePoints -= this.planet.settings[setting];
            }

            return availablePoints;
        },

        population() {
            return Math.floor(this.planet.population / 100000);
        },

        factionColor() {
            return this.$store.state.user.player.faction.color;
        },
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

        changeSetting(setting, value) {
            this.$store.commit('user/setPlanetSetting', { setting, value });
        },

        async updateSetting(setting, value) {
            this.changeSetting(setting, value);

            await this.$repositories.planet.updateSettings(this.planet);
        }
    }
}
</script>

<style lang="less" scoped>
    #population-points {
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
        border: 1px solid #2D2D2D;
        border-radius: 10px;

        & > header {
            color: grey;
            text-align: justify;
        }

        & > section {
            & > div {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;

                & > div:first-child {
                    flex-grow: 1;
                    margin-right: 30px;
                }

                & > div:last-child {
                    display: flex;
                    align-items: center;

                    & > span {
                        font-size: 1.2em;
                        font-weight: bold;
                        padding-right: 10px;
                    }
                }
            }
        }

        & > footer {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;

            & > p {
                display: flex;
                align-items: center;

                & > strong {
                    font-size: 1.2em;
                    padding-left: 20px;
                    padding-right: 10px;
                }
            }
        }
    }
</style>
