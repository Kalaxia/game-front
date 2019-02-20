<template>
    <div :class="['ship-group', group.type]">
        <header>
            <div>
                <h5>{{ group.name }}</h5>
                <h6>{{ $t('ships.types')[group.type] }}</h6>
            </div>
            <span>{{ group.quantity }}</span>
        </header>
        <section>
            <img :src="framePicture" :alt="group.name" />
        </section>
    </div>
</template>

<script>
import framesData from '~/resources/ship_frames';

export default {
    name: 'ship-group',

    props: ['group'],

    computed: {
        framePicture: function() {
            return `/static/images/shipyard/frame/${framesData[this.group.frame].picture}`;
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/box.less';
    @import '~less/atoms/ship/type.less';

    .ship-group {
        padding: 10px 20px;
        clip-path: @smallBoxClipPath;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        span {
            padding-left: 20px;
            font-size: 1.2em;
        }
    }

    section {
        text-align: center;
    }

    h5, h6 {
        margin: 0px;
    }

    img {
        height: 86px;
    }
</style>
