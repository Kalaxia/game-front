<template>
    <router-link :to="`/profile/${player.id}`" :style="{ color: player.faction.colors['main'] }">
        {{ player.pseudo }}
    </router-link>    
</template>

<script>
export default {
    name: 'player-link',

    props: ['player']
}
</script>