<template>
    <div>
        <faction-menu :faction="faction" />
        <div id="finances">
            <header>
                <h1>Finances</h1>
                <div class="treasury">
                    {{ $t('faction.treasury') }} :
                    {{ faction.wallet }}
                    <colored-picto src="G_P_Mon_64px.png" :width="32" :height="32" :color="factionColors['main']" />
                </div>
            </header>
            <section>
                <div class="revenue">
                    <h3>Revenus</h3>
                    <div>
                        <div>
                            <h5>{{ $t('faction.settings.planet_taxes.title') }}</h5>
                            <span>
                                {{ faction.settings['planet_taxes'].value }}
                                <colored-picto src="G_P_Mon_64px.png" :width="26" :height="26" :color="factionColors['main']" />
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import FactionMenu from '~/components/molecules/faction/menu';
import ColoredPicto from '~/components/atoms/colored-picto';
import { mapGetters } from 'vuex';

export default {
    name: 'faction-finances',

    async asyncData({ app, params }) {
        return {
            faction: await app.$repositories.faction.getFaction(params.id)
        };
    },

    components: {
        ColoredPicto,
        FactionMenu
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    #finances {
        grid-column: ~"2/10";
        grid-row: ~"3/9";

        & > header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            & > h1 {
                margin: 0px;
            }

            & > div {
                display: flex;
                align-items: center;
                font-size: 1.2em;

                & > .picto {
                    margin-left: 5px;
                }
            }
        }

        & > section {
            & > .revenue {
                & > div {
                    & > div {
                        & > h5 {
                            margin: 10px 0px;
                        }

                        & > span {
                            display: flex;
                            align-items: center;

                            & > .picto {
                                margin-left: 5px;
                            }
                        }
                    }
                }
            }
        }
    }

    .faction-menu {
        grid-row: ~"3/7";
        grid-column: 1;
    }
</style>
