<template>
    <div id="planet-resources">
        <production-link />
        <resource-item v-for="resource in resources" :resource="resource" :key="resource.name" />
    </div>
</template>

<script>
import ProductionLink from '../../atoms/resource/production-link';
import ResourceItem from '../../atoms/resource/item';

export default {
    name: 'planet-resources',

    props: ['resources'],

    components: {
        ProductionLink,
        ResourceItem
    }
}
</script>

<style lang="less" scoped>

</style>
