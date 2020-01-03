<template>
    <colored-picto :src="orderPicto" :width="size" :height="size" :color="color" />
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import { ORDER_PASS, ORDER_CONQUER, ORDER_DELIVER } from '~/model/fleet/journeyStep';

export default {
    name: 'order-picto',

    props: ['order', 'size', 'color'],

    components: {
        ColoredPicto
    },

    computed: {
        orderPicto() {
            return {
                [ORDER_PASS]: 'ships/Fleet.svg',
                [ORDER_CONQUER]: 'ships/Attack.svg',
                [ORDER_DELIVER]: 'trade/Lots.svg'
            }[this.order];
        },
    }
}
</script>
