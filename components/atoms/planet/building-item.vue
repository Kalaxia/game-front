<template>
    <nuxt-link v-if="building"
       :to="link"
       :class="['building', categoryClass, {constructing: isConstructing}]"
       :style="{ backgroundImage: `url('/images/buildings/${buildingPicture}')`}" />
    <nuxt-link v-else class="building area" to="/buildings" />
</template>

<script>
export default {
    name: 'building-item',
    
    props: ['building'],

    computed: {
        link() {
            return (this.building.status === 'operational' && typeof this.$resources.buildings[this.building.name].link !== 'undefined')
                ? this.$resources.buildings[this.building.name].link
                : '/buildings';
        },

        categoryClass() {
            return `category-${this.$resources.buildings[this.building.name].category}`
        },

        isConstructing() {
            return this.building.status === 'constructing';
        },

        buildingPicture() {
            return this.$resources.buildings[this.building.name].picture;
        }
    }
}
</script>

<style lang="less" scoped>
    .building {
        position: relative;
        width: 64px;
        height: 64px;
        margin: 10px;
        border: 2px solid #E1BB8A;
        background-color: #EFEFEF;
        background-repeat: no-repeat;
        background-size: 54px 54px;
        background-position: 5px 5px;
        cursor: pointer;
        border-radius: 40px;
        overflow: hidden;
        
        &.area {
            background-image: url('/images/buildings/area.png');
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
