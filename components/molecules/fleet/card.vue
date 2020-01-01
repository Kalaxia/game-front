<template>
    <div class="fleet-card" :style="{ borderColor: factionColors['grey'], color: factionColors['white'] }">
        <header v-if="fleet.player.faction" >
            <player-avatar :player="fleet.player" :width="38" :height="38" />
            <faction-banner :faction="fleet.player.faction" :width="32" :height="32" />
        </header>
        <section>
            <h5>
                <colored-picto src="ships/Fleet.svg" :color="factionColors['white']" :width="28" :height="28" />
                <span>{{ $t('fleet.title', {fleet: fleet.id}) }}</span>
            </h5>
        </section>
        <footer>
            <div v-for="ss in fleet.shipSummary" :key="ss.type" class="ship-stat">
                <ship-type :type="ss.type" :color="factionColors['grey']" :size="24" />
                <span>{{ ss.nb_ships }}</span>
            </div>
        </footer>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import FactionBanner from '~/components/atoms/faction/banner';
import PlayerAvatar from '~/components/atoms/player/avatar';
import ShipType from '~/components/atoms/ship/type';
import { mapGetters } from 'vuex';

export default {
    name: 'fleet-card',

    props: ['fleet'],

    components: {
        ColoredPicto,
        FactionBanner,
        PlayerAvatar,
        ShipType,
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors',
            user: 'user/user'
        })
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/box.less';

    .fleet-card {
        min-width: 150px;
        min-height: 100px;
        border-radius: 10px;
        border: 1px solid;
        text-decoration: none;
        margin: 5px;
        padding: 5px 10px;
        display: flex;
        flex-direction: column;

        & > header {
            position: relative;
            height: 24px;
            
            & > .avatar {
                position: absolute;
                top: -15px;
                left: 0px;
            }

            & > .faction-banner {
                position: absolute;
                top: -5px;
                right: 0px;
            }
        }

        & > section {
            font-size: 1.2em;
            margin: 5px 0px;

            & > h5 {
                display: flex;
                align-items: center;
                margin: 0px;
                font-weight: normal;
                font-variant: small-caps;

                & > span {
                    padding-left: 5px;
                }
            }
        }

        & > footer {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            & > .ship-stat {
                display: flex;
                align-items: center;
                flex-basis: 45%;

                & > span {
                    padding-left: 10px;
                }
            }
        }
    }

    p {
        margin: 0px;
        padding-left: 10px;
    }
</style>
