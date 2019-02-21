<template>
    <div>
        <fleets-list :fleets="fleets" />
    </div>
</template>

<script>
import Fleet from '~/model/fleet/fleet';
import FleetsList from '~/components/organisms/fleet/list';

export default {
    name: 'page-fleets',

    data() {
        return {
            fleets: []
        };
    },

    components: {
        FleetsList
    },

    async mounted() {
        this.fleets = await this.$repositories.fleet.getFleets();
    }
};
</script>

<style lang="less" scoped>
    #fleets-list {
        grid-row: ~"3/8";
        grid-column: ~"3/9";
    }
</style>