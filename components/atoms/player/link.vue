<template>
    <nuxt-link class="player-link" :to="`/player/${player.id}`">
        <player-avatar :player="player" :width="width" :height="width" />
        <span :style="{ color: player.faction.colors['white'] }">{{ player.pseudo }}</span>
    </nuxt-link>   
</template>

<script>
import PlayerAvatar from '~/components/atoms/player/avatar';

export default {
    name: 'player-link',

    props: ['player', 'width'],

    components: {
        PlayerAvatar
    }
}
</script>

<style lang="less" scoped>
.player-link {
    display: flex;
    align-items: center;
    text-decoration: none;

    & > span {
        padding-left: 5px;
    }
}
</style>