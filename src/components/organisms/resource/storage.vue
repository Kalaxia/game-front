<template>
    <div id="resource-storage">
        <header>
            <h3>{{ $t('planet.storage.name') }}</h3>
        </header>
        <section>
            <storage-item v-for="resource in resources" :resource="resource" :storage="storage" :key="resource.name" />
        </section>
    </div>
</template>

<script>
import StorageItem from 'components/molecules/resource/storage-item';

export default {
    name: 'resource-storage',

    props: ['resources', 'storage'],

    components: {
        StorageItem
    }
}
</script>

<style lang="less" scoped>
    h3 {
        margin-top: 0;
    }

    #resource-storage > section > div {
        margin: 5px 0px;
    }
</style>
