<template>
    <div class="avatar">
        <img :src="`/images/avatars/${this.player.gender}/${this.player.avatar}.png`" :style="style" :alt="player.pseudo" />
    </div>
</template>

<script>
export default {
    name: 'player-avatar',
    
    props: ['player', 'width', 'height', 'disableBorder'],

    computed: {
        style() {
            return {
                width: `${this.width - 6}px`,
                height: `${this.height - 6}px`,
                border: (!this.disableBorder) ? `3px solid ${this.player.faction.colors['main']}` : null,
                borderRadius: (!this.disableBorder) ? '50%' : 0
            }
        }
    }
}
</script>
