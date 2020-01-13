<template>
    <div class="combat-report-party" :style="{ borderColor: factionColors['grey'] }">
        <header :style="{ borderColor: factionColors['grey'] }">
            <player-avatar :player="party.player" :width="48" :height="48" />
            <div class="data">
                <h5>{{ party.player.pseudo }}</h5>
                <h6>{{ $t('fleet.title', { fleet: party.id }) }}</h6>
            </div>
        </header>
        <section>
            <div v-for="ship in partyShips" :key="ship.type">
                <ship-type :type="ship.type" :color="factionColors['white']" :size="24" />
                <span :style="{ color: party.player.faction.colors['main'] }">{{ ship.quantity }}</span>
                <span :style="{ color: factionColors['white'] }">{{ ship.loss }}</span>
            </div>
        </section>
    </div>
</template>

<script>
import PlayerAvatar from '~/components/atoms/player/avatar';
import ShipType from '~/components/atoms/ship/type';
import { mapGetters } from 'vuex';

export default {
    name: 'combat-report-party',
    
    props: ['party', 'ships', 'losses'],

    components: {
        PlayerAvatar,
        ShipType
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),
    
        partyShips() {
            return Object.keys(this.ships).map(t => ({
                type: t,
                quantity: this.ships[t],
                loss: typeof this.losses[t] !== 'undefined' ? this.losses[t] : 0
            }));
        }
    }
}
</script>

<style lang="less" scoped>
    .combat-report-party {
        padding: 10px 20px;
        border: 1px solid;
        border-radius: 10px;

        & > header {
            display: flex;
            align-items: center;
            border-bottom: 1px solid;
            padding-bottom: 5px;

            & > .data {
                margin-left: 10px;
                & > h5 {
                    margin: 0px;
                }

                & > h6 {
                    margin: 0px;
                }
            }
        }

        & > section {
            display: flex;

            & > div {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 5px;

                & > span {
                    margin-top: 2px;
                }
            }
        }
    }
</style>
