<template>
    <div class="faction-banner" :style="{ backgroundColor: faction.color, width: width + 'px', height: height + 'px' }">
        <img :src="`/images/factions/${faction.banner}`" :alt="faction.banner"/>
    </div>
</template>

<script>
export default {
    name: 'faction-banner',

    props: ['faction', 'width', 'height']
}
</script>

<style lang="less" scoped>
    div {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 20px;
        clip-path: polygon(0% 0%, 100% 0%, 100% 70%, 50% 100%, 0% 70%);
    }

    img {
        width: 80%;
    }
</style>
