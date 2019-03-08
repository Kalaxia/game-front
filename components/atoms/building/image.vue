<template>
    <div :style="style" :class="['building-image', categoryClass, {constructing: isConstructing}]">
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
        background-color: white;

        & > img {
            width: 80%;
            height: 80%;
        }

        &.category-resource {
            background-color: #08C;
        }
        &.category-techno {
            background-color: #F843B1;
        }
        &.category-trade {
            background-color: #FFC928;
        }
        &.category-shipyard {
            background-color: #FF2828;
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
