<template>
    <div :id="`system-${system.id}`" :class="['system', {mine: isPlayerSystem}]" :style="style" @click="selectSystem" @contextmenu="selectSystem">

    </div>
</template>

<script>
export default {
    name: 'map-system',

    props: ['system', 'isPlayerSystem'],

    computed: {
        style() {
            return {
                top: this.system.coord_y * this.$store.state.map.scale - 10 + 'px',
                left: this.system.coord_x * this.$store.state.map.scale - 10 + 'px'
            };
        },
    },

    methods: {
        selectSystem() {
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
