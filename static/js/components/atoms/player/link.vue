<template>
    <a :href="`/views/profile.html?id=${player.id}`" :style="{ color: player.faction.color }">
        {{ player.pseudo }}
    </a>    
</template>

<script>
export default {
    name: 'player-link',

    props: ['player']
}
</script>

<style lang="less" scoped>

</style>
