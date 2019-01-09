<template>
    <div :class="['system', {mine: isMine}]" :style="style" @click="selectSystem" @contextmenu="selectSystem">

    </div>
</template>

<script>
export default {
    name: 'map-system',

    props: ['system'],

    computed: {
        style: function() {
            return {
                top: this.system.coord_y * this.$store.state.map.scale - 10 + 'px',
                left: this.system.coord_x * this.$store.state.map.scale - 10 + 'px'
            };
        },

        isMine: function() {
            return this.system.id === this.$store.state.user.currentPlanet.system.id;
        }
    },

    methods: {
        selectSystem: function() {
            if (this.$store.state.map.fleet === null) {
                return;
            }
            this.$store.state.map.selectedSystemId = this.system.id;
        }
    }
}
</script>

<style lang="less" scoped>
    div {
        position: absolute;
        width: 20px;
        height: 20px;
        box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        border: 1px solid #FFF;
        background-color: #EFEFEF;

        &.mine {
            background-color: red;
        }
    }
</style>
