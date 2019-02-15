<template>
    <img :src="`/static/images/picto/${image}`" :width="width" :height="height" :alt="type" />  
</template>

<script>
export default {
    name: 'planet-image',

    props: ['type', 'width', 'height'],

    computed: {
        image() {
            return {
                arctic: 'PL_Ice_200px.png',
                desert: 'PL_Gaz_200px.png',
                oceanic: 'PL_Wate_200px.png',
                temperate: 'PL_Temp_200px.png',
                tropical: 'PL_Trop_200px.png',
                rocky: 'PL_Rock_200px.png',
                volcanic: 'PL_Volc_200px.png'
            }[this.type];
        }
    }
}
</script>

<style lang="less" scoped>

</style>
