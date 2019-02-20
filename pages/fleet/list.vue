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
        const response = await fetch(`/api/fleets`, {
            method: 'GET',
            headers: this.$store.state.api.headers
        });
        const payload = { response, data: {} };
        await this.$store.dispatch('api/responseMiddleware', payload);
        
        for (const fleetData of payload.data) {
            this.fleets.push(new Fleet(fleetData));
        }
    }
};
</script>

<style lang="less" scoped>
    #fleets-list {
        grid-row: ~"3/8";
        grid-column: ~"3/9";
    }
</style>