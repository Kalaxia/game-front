<template>
    <div class="building-item" :style="{ borderColor: (isSelected) ? factionColors['main'] : 'grey'}">
        <building-image :building="building" width="56px" :color="factionColors['white']" />
    </div>
</template>

<script>
import Gauge from '~/components/atoms/gauge';
import BuildingImage from '~/components/atoms/building/image';
import ColoredPicto from '~/components/atoms/colored-picto';
import ConstructionState from '~/components/atoms/building/construction-state';
import { mapGetters } from 'vuex';

export default {
    name: 'building-item',
    
    props: ['building', 'isSelected'],

    components: {
        BuildingImage,
        ColoredPicto,
        ConstructionState,
        Gauge
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    },

    methods: {
        constructionLevel(constructionState) {
            return [{
                color: this.$store.getters['user/factionColors']['main'],
                value: Math.floor(constructionState.current_points / constructionState.points * 100)
            }];
        }
    }
}
</script>

<style lang="less" scoped>
    .building-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border: 2px solid;
        border-radius: 10px;
        cursor: pointer;
    }
</style>
