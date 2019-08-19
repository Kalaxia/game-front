<template>
    <div :style="style" :class="['building-image', {constructing: isConstructing && !disableConstructionPicto}]">
        <div :style="`mask-image: url('/images/buildings/${picture}'); background-color: ${color}`"></div>
    </div>
</template>

<script>
export default {
    name: 'building-image',

    props: ['building', 'width', 'color', 'disableConstructionPicto'],

    computed: {
        picture() {
            return this.$resources.buildings[this.building.name].picture;
        },

        categoryClass() {
            return `category-${this.$resources.buildings[this.building.name].type}`
        },

        isConstructing() {
            return this.building.status === 'constructing';
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
        position: relative;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 2px solid black;

        & > div {
            width: 80%;
            height: 80%;
            mask-repeat: no-repeat;
            mask-size: cover;
        }

        &.constructing:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            background-image: url('/images/buildings/constructing.svg');
            background-repeat: no-repeat;
            background-position:center;
            background-size: 56px 56px;
        }
    }
</style>
