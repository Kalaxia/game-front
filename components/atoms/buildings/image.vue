<template>
    <div class="building-image" :style="style">
        <img :src="`/images/buildings/${picture}`" :alt="building.name" />
    </div>
</template>

<script>
export default {
    name: 'building-image',

    props: ['building', 'width'],

    computed: {
        picture() {
            return this.$resources.buildings[this.building.name].picture;
        },

        style() {
            return {
                width: this.width,
                height: this.width,
                minWidth: this.width,
                minHeight: this.width
            };
        }
    }
}
</script>

<style lang="less" scoped>
    .building-image {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 2px solid black;
        background-color: white;

        & > img {
            width: 80%;
            height: 80%;
        }
    }
</style>
