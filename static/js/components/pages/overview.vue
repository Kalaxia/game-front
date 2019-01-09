<template>
    <div>
        <planet-list :planets="planets" />
    </div>
</template>

<script>
import PlanetList from '../organisms/planet/list';

export default {
    name: 'page-overview',

    components: {
        PlanetList,
    },

    computed: {
        planets: function() {
            return this.$store.state.user.planets;
        }
    }
};
</script>

<style lang="less">
    @import '../../../less/main.less';
</style>