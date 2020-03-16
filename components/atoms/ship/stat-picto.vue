<template>
    <colored-picto :src="picto" :color="color" :width="size" :height="size" />
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto' 

export default {
    name: 'ship-stat-picto',

    props: ['stat', 'color', 'size'],

    components: {
        ColoredPicto
    },

    computed: {
        picto() {
            return {
                cooldown: 'map/HourGlass.svg',
                damage: 'ships/Attack.svg',
                precision: 'ships/Precision.svg',
                nb_shots: 'ships/Multiple-shots.svg',
                armor: 'ships/Plating.svg',
                speed: 'ships/Dodge.svg',
                size: 'ships/Weight.svg',
                power: 'ships/Shield.svg'
            }[this.stat];
        },
    }
}
</script>