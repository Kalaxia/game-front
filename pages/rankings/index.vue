<template>
    <div>
        <div id="faction-rankings">
            <header>
                <h1>
                    <colored-picto src="Victory.svg" :color="factionColors['white']" :width="48" :height="48" />
                    Classement
                </h1>
            </header>

            <section>
                <div class="territorial">
                    <header>
                        <colored-picto src="G_P_Map_64px.png" :color="factionColors['white']" :width="36" :height="36" />
                    </header>

                    <section>
                        <div class="faction" v-for="r in territorialRanking" :key="r.faction.id" :style="{ backgroundColor: factionColors['black'], borderColor: factionColors['grey'] }">
                            <faction-banner :faction="r.faction" :width="64" :height="96" />
                            <div>
                                <h4>{{ r.faction.name }}</h4>
                                <h5>{{ r.nb_systems }} systèmes contrôlés</h5>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="financial">
                    <header>
                        <colored-picto src="B_Merc_64px.png" :color="factionColors['white']" :width="36" :height="36" />
                    </header>

                    <section>
                        <div class="faction" v-for="f in financialRanking" :key="f.id" :style="{ backgroundColor: factionColors['black'], borderColor: factionColors['grey'] }">
                            <faction-banner :faction="f" :width="64" :height="96" />
                            <div>
                                <h4>{{ f.name }}</h4>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import FactionBanner from '~/components/atoms/faction/banner';
import { mapGetters } from 'vuex';

export default {
    name: 'page-ranking',

    async asyncData({ app }) {
        const [ territorialRanking, financialRanking ] = await Promise.all([
            app.$repositories.ranking.getTerritorialRanking(),
            app.$repositories.ranking.getFinancialRanking()
        ]);
        return { territorialRanking, financialRanking };
    },

    components: {
        ColoredPicto,
        FactionBanner
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less">
#faction-rankings {
    grid-row: ~"2/10";
    grid-column: ~"2/10";

    & > header {
        & > h1 {
            display: flex;
            align-items: center;

            & > .picto {
                margin-right: 10px;
            }
        }
    }

    & > section {
        display: flex;

        & > div {
            flex-basis: 25%;
            margin-right: 40px;

            & > header {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            & > section {
                margin-top: 20px;
                display: flex;
                flex-direction: column;

                & > .faction {
                    display: flex;
                    height: 50px;
                    margin-bottom: 60px;
                    position: relative;
                    padding: 10px 10px 10px 80px;
                    border: 1px solid;
                    border-radius: 10px;

                    & > .faction-banner {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                    }

                    & > div {
                        & > h4 {
                            margin: 0px;
                        }

                        & > h5 {
                            margin: 0px;
                            margin-top: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>