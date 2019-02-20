<template>
    <div>
        <fleet-details v-if="fleet" :fleet="fleet"></fleet-details>
    </div>
</template>

<script>
import Fleet from '~/model/fleet/fleet';

import FleetDetails from '~/components/organisms/fleet/details';

export default {
    name: 'page-fleet',

    data() {
        return {
            fleet: null
        };
    },

    components: {
        FleetDetails
    },

    async mounted() {
        const response = await fetch(`/api/fleets/${this.$route.params.id}`, { 
            method: 'GET',
            headers: this.$store.state.api.headers
        });
        const payload = { response, data: {} };
        await this.$store.dispatch('api/responseMiddleware', payload);

        this.fleet = new Fleet(payload.data);
    }
}
</script>

<style lang="less" scoped>
    @import '~/assets/less/atoms/ship/type.less';

    #fleet-details {
        grid-column: ~"3/9";
        grid-row: ~"3/9";
    }
</style>