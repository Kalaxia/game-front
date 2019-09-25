<template>
    <div class="module-stats">
        <div v-for="(value, stat) in module.stats" :key="`model-${module.slug}-${stat}`">
            <stat-picto :stat="stat" :color="pictoColor(value)" size="22" />
        </div>
    </div>
</template>

<script>
import StatPicto from '~/components/atoms/ship/stat-picto';

export default {
    name: 'module-stats',

    props: ['module'],

    components: {
        StatPicto
    },

    methods: {
        pictoColor(stat) {
            return (stat < 0) ? '#E72367' : '#68BA82'
        },
    }
}
</script>

<style lang="less" scoped>

</style>
