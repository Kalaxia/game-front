<template>
    <div id="player-profile">
        <div class="data" :style="{ borderColor: factionColors['grey'] }">
            <header>
                <player-avatar :player="player" :width="64" :height="64" />
                <div class="name">
                    <h1>{{ player.pseudo }}</h1>
                    <h3>{{ $t('player.titles.governor') }} - {{ player.faction.name }}</h3>
                </div>
                <div class="banner">
                    <faction-banner :faction="player.faction" :width="64" :height="96" />
                </div>
            </header>
        </div>
        <planet-list :planets="planets" :style="{ borderColor: factionColors['grey'] }" />
    </div>
</template>

<script>
import PlayerAvatar from '~/components/atoms/player/avatar';
import FactionBanner from '~/components/atoms/faction/banner';
import PlanetList from '~/components/organisms/planet/list';
import { mapGetters } from 'vuex';

export default {
    name: 'player-profile',
    
    props: ['player', 'planets'],

    components: {
        FactionBanner,
        PlayerAvatar,
        PlanetList
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    #player-profile {
        display: flex;
        justify-content: space-between;

        & > div {
            flex-basis: 40%;
            flex-grow: 1;
            padding: 10px 20px;
            border: 2px solid;
            border-radius: 10px;
        }

        & > .data {
            margin-right: 40px;
            padding-top: 0px;

            & > header {
                display: flex;
                align-items: flex-start;

                & > div:not(.banner) {
                    padding-top: 10px;
                }

                & > .name {
                    margin-left: 15px;

                    & > h1 {
                        margin: 0px;
                    }

                    & > h3 {
                        margin: 0px;
                    }
                }

                & > .banner {
                    flex-grow: 1;
                    display: flex;
                    justify-content: flex-end;
                }
            }
        }
    }
</style>
