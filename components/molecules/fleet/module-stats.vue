<template>
    <div class="module-stats">
        <div v-for="(value, stat) in module.stats" :key="`model-${module.slug}-${stat}`">
            <colored-picto :src="statPicto(stat)" :color="pictoColor(value)" width="22" height="22" />
        </div>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';

export default {
    name: 'module-stats',

    props: ['module'],

    components: {
        ColoredPicto
    },

    methods: {
        statPicto(stat) {
            return {
                damage: 'ships/Attack.svg',
                precision: 'ships/Precision.svg',
                nb_shots: 'ships/Multiple-shots.svg',
                armor: 'ships/Plating.svg',
                speed: 'ships/Dodge.svg',
                size: 'ships/Weight.svg',
                power: 'ships/Shield.svg'
            }[stat];
        },

        pictoColor(stat) {
            return (stat < 0) ? '#E72367' : '#68BA82'
        },
    }
}
</script>

<style lang="less" scoped>

</style>
