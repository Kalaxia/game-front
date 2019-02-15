<template>
    <div>
        <resource-density-graph v-if="planet" :id="planet.id" :resources="planet.resources" :size="500" />
        <resource-storage v-if="planet" :resources="planet.resources" :storage="planet.storage" />
    </div>
</template>

<script>
import Planet from 'model/planet';

import ResourceDensityGraph from 'components/molecules/resource/density-graph';
import ResourceStorage from 'components/organisms/resource/storage';

export default {
    name: 'page-production',

    data() {
        return {
            planet: null
        };
    },

    components: {
        ResourceDensityGraph,
        ResourceStorage
    },

    async mounted() {
        const response = await fetch(`/api/planets/${this.$route.params.id}`, {
            method: 'GET',
            headers: this.$store.state.api.headers
        });
        const payload = { response, data: {}};
        await this.$store.dispatch('api/responseMiddleware', payload);

        this.planet = new Planet(payload.data);
    }
}
</script>

<style lang="less" scoped>
    .resource-density-graph {
        grid-column: ~"2/6";
        grid-row: ~"3/8";
    }

    #resource-storage {
        grid-column: ~"6/10";
        grid-row: ~"3/8";
    }
</style>