<template>
    <div class="loader">
        <div></div>
    </div>
</template>

<script>
export default {
    name: 'map-loader'
}
</script>

<style lang="less" scoped>
    @color: #f5cc4e;

    .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: calc(50% - 1em / 2);
        left: calc(50% - 1em / 2);
        
        & > div {
            position: absolute;
            background-color: #f5cc4d;
            width: 1em;
            height: 1em;
            border-radius: 50%;
            animation: ripple 0.7s linear infinite;
        }
    }

    @keyframes ripple {
        0% {
            box-shadow: 0 0 0 0 rgba(@color, 0.3),
                        0 0 0 1em rgba(@color, 0.3),
                        0 0 0 3em rgba(@color, 0.3),
                        0 0 0 5em rgba(@color, 0.3);
        }
        100% {
            box-shadow: 0 0 0 1em rgba(@color, 0.3),
                        0 0 0 3em rgba(@color, 0.3),
                        0 0 0 5em rgba(@color, 0.3),
                        0 0 0 8em rgba(@color, 0);
        }
    }
</style>
