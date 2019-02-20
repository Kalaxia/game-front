<template>
    <div class="faction-container" :style="style" @click="$emit('select-faction', faction)">
        <div class="faction-item">
            <img :src="`/images/factions/${faction.banner}`" :alt="faction.name"/>
            <p>{{ faction.description }}</p>
            <h5>{{ faction.name }}</h5>
        </div>
    </div>
</template>

<script>
export default {
    name: 'faction-item',
    
    props: ['faction', 'selectedFaction'],

    computed: {
        style() {
            return {
                padding: (this.selectedFaction === this.faction) ? '5px' : '2px',
                backgroundColor: this.faction.color,
            };
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/box.less';

    .faction-container {
        clip-path: @smallRectClipPath;
        transition: padding 0.2s ease-out;
        cursor: pointer;
    }

    .faction-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: calc(100% - 40px);
        padding: 20px 30px;
        background-color: #000;
        border-radius: 20px;
        clip-path: @smallRectClipPath;

        & > img {
            height: 126px;
        }

        & > p {
            margin-top: 30px;
            font-variant: small-caps;
            font-size: 1.1em;
        }

        & > h5 {
            font-style: italic;
            font-variant: small-caps;
            font-size: 1.2em;
            text-align: center;
        }
    }
</style>
