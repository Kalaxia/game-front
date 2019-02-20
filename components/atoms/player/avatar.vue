<template>
    <div class="avatar">
        <img :src="`/images/avatars/portrait-mauve.png`" :style="style" :alt="player.pseudo" />
    </div>
</template>

<script>
export default {
    name: 'player-avatar',
    
    props: ['player', 'width', 'height'],

    computed: {
        style: function() {
            return {
                width: `${this.width - 6}px`,
                height: `${this.height - 6}px`,
                border: `3px solid ${this.player.faction.color}`
            }
        }
    }
}
</script>

<style lang="less" scoped>
    img {
        border-radius: 50%;
    }
</style>
