<template>
    <div class="picto" :style="style"></div>
</template>

<script>
export default {
    name: 'colored-picto',

    props: ['src', 'color', 'width', 'height'],

    computed: {
        style() {
            return {
                width: `${this.width}px`,
                height: `${this.height}px`,
                maskImage: `url('/images/picto/${this.src}')`,
                maskSize: 'cover',
                backgroundColor: this.color
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>
