<template>
    <div class="casus-belli" :style="{ borderColor: faction.colors['grey'] }">
        <header>
            <player-avatar :player="player" :width="48" :height="48" />
            <h4>{{ player.pseudo }}</h4>
        </header>

        <section class="type">
            {{ $t(`faction.war.casus_belli.types.${casusBelli.type}`) }}
        </section>

        <section v-if="casusBelli.type === 'conquest'" class="planet">
            <planet-image :width="48" :height="48" :type="casusBelli.data.planet.type" />
            <span>{{ casusBelli.data.planet.name }}</span>
        </section>

        <section v-if="casusBelli.type === 'combat'" class="combat">
            <player-avatar :player="casusBelli.data.combat.defender.player" :width="48" :height="48" />
            <span>{{ casusBelli.data.combat.defender.player.pseudo }}</span>
        </section>
    </div>
</template>

<script>
import PlayerAvatar from '~/components/atoms/player/avatar';
import PlanetImage from '~/components/atoms/planet/image';

export default {
    name: 'casus-belli',
    
    props: ['faction', 'casusBelli'],

    components: {
        PlayerAvatar,
        PlanetImage
    },

    computed: {
        player() {
            return Object.assign({}, this.casusBelli.player, {
                faction: this.faction
            });
        }
    }
}
</script>

<style lang="less">
.casus-belli {
    padding: 10px 20px;
    border: 2px solid;
    border-radius: 10px;
    margin: 5px;

    & > header {
        display: flex;
        align-items: center;

        & > h4 {
            margin-left: 10px;
        }
    }

    & > .planet,
    & > .combat {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 5px;

        & > span {
            padding-top: 5px;
        }
    }
}
</style>