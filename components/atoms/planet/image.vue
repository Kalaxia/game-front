<template>
    <img class="planet-image" :src="`/images/planet/${image}`" :width="width" :height="height" :alt="type" />  
</template>

<script>
export default {
    name: 'planet-image',

    props: ['type', 'width', 'height'],

    computed: {
        image() {
            return {
                arctic: 'Ice.png',
                desert: 'Gaz.png',
                oceanic: 'Ocean.png',
                temperate: 'Tempered.png',
                tropical: 'Tropical.png',
                rocky: 'Mountain.png',
                volcanic: 'Lava.png'
            }[this.type];
        }
    }
}
</script>

<style lang="less" scoped>

</style>
