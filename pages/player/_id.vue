<template>
    <player-profile :player="player" :planets="planets" />
</template>

<script>
import PlayerProfile from '~/components/organisms/player/profile';

export default {
    name: 'page-profile',
    
    async asyncData({ app, params }) {
        const [ player, planets ] = await Promise.all([
            app.$repositories.player.getPlayer(params.id),
            app.$repositories.planet.getPlayerPlanets(params.id)
        ]);
        return { player, planets };
    },

    components: {
        PlayerProfile
    }
}
</script>

<style lang="less" scoped>
    #player-profile {
        grid-column: ~"3/9";
        grid-row: ~"3/9";
    }
</style>
