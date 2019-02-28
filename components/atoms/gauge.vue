<template>
    <div class="gauge" :style="{ backgroundColor: background }">
        <div v-for="(level, index) in levels"
            :key="`gauge-level-${index}`"
            :style="{ backgroundColor: level.color, width: `${level.value}%` }"></div>
    </div>
</template>

<script>
export default {
    name: 'gauge',

    props: ['levels', 'background']
}
</script>

<style lang="less" scoped>
    .gauge {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        border-radius: 10px;
        overflow: hidden;
    }
</style>
