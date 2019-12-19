<template>
    <div class="fleet-card" :style="{ borderColor: factionColors['grey'], color: factionColors['white'] }">
        <header>
            <player-avatar v-if="fleet.player.faction" :player="fleet.player" :width="38" :height="38" />
            <faction-banner v-if="fleet.player.faction" :faction="fleet.player.faction" :width="32" :height="32" />
        </header>
        <section>
            <h5>
                <colored-picto src="ships/Fleet.svg" :color="factionColors['white']" :width="28" :height="28" />
                {{ $t('fleet.title', {fleet: fleet.id}) }}
            </h5>
        </section>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import FactionBanner from '~/components/atoms/faction/banner';
import PlayerAvatar from '~/components/atoms/player/avatar';
import { mapGetters } from 'vuex';

export default {
    name: 'fleet-card',

    props: ['fleet'],

    components: {
        ColoredPicto,
        FactionBanner,
        PlayerAvatar,
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
        min-width: 120px;
        min-height: 100px;
        border-radius: 10px;
        border: 1px solid;
        text-decoration: none;
        margin: 5px;
        display: flex;
        flex-direction: column;

        & > header {
            position: relative;
            
            & > .avatar {
                position: absolute;
                top: -10px;
                left: 10px;
            }

            & > .faction-banner {
                position: absolute;
                top: 0px;
                right: 10px;
            }
        }

        & > section {
            padding: 10px;
            flex-grow: 1;
            font-size: 1.2em;
            margin: 5px 0px;
            display: flex;
            justify-content: center;
            align-items: flex-end;

            & > h5 {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 0px;
                font-weight: normal;
                font-variant: small-caps;
            }
        }
    }

    p {
        margin: 0px;
        padding-left: 10px;
    }
</style>
