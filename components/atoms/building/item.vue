<template>
    <nuxt-link v-if="building" :to="link" class="building">
        <building-image :building="building" width="64px" :color="factionColors['white']" />
    </nuxt-link>
    <nuxt-link v-else class="building area" to="/buildings" />
</template>

<script>
import BuildingImage from '~/components/atoms/building/image';
import { mapGetters } from 'vuex';

export default {
    name: 'building-item',
    
    props: ['building'],

    components: {
        BuildingImage
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        link() {
            return (this.building.status === 'operational' && typeof this.$resources.buildings[this.building.name].link !== 'undefined')
                ? this.$resources.buildings[this.building.name].link
                : '/buildings';
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
    }
</style>
