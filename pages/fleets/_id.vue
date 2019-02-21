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
        this.fleet = await this.$repositories.fleet.getFleet(this.$route.params.id);
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/ship/type.less';

    #fleet-details {
        grid-column: ~"3/9";
        grid-row: ~"3/9";
    }
</style>