<template>
    <a v-if="building"
       :href="link"
       :class="['building', categoryClass, {constructing: isConstructing}]"
       :style="{ backgroundImage: `url('/static/images/buildings/${buildingPicture}')`}">
    </a>
    <a v-else class="building area" href="/views/base/buildings.html"></a>
</template>

<script>
import buildingsData from '../../../resources/buildings';

export default {
    name: 'building-item',
    
    props: ['building'],

    computed: {
        link: function() {
            return (this.building.status === 'operational' && typeof buildingsData[this.building.name].view !== 'undefined')
            ? `/views/base/${buildingsData[this.building.name].view}`
            : '/views/base/buildings.html'
        },
        categoryClass: function() {
            return `category-${buildingsData[this.building.name].category}`
        },
        isConstructing: function() {
            return this.building.status === 'constructing';
        },
        buildingPicture: function() {
            return buildingsData[this.building.name].picture;
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
            background-image: url('/static/images/buildings/area.png');
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
            background-image: url('/static/images/buildings/constructing.svg');
            background-repeat: no-repeat;
            background-position:center;
            background-size: 56px 56px;
        }
    }
</style>
