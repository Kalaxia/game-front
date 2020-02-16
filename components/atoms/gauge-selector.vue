<template>
    <div class="gauge-selector">
        <header>
            <span>{{ min }}</span>
            <span>{{ max }}</span>
        </header>
        <section :style="{ borderColor: color }" ref="container" @click="move">
            <div :style="{ width: width, backgroundColor: color }" ref="gauge">
                <div :style="{ borderColor: color }">

                </div>
            </div>
        </section>
    </div>
</template>

<script>

export default {
    name: 'gauge-selector',

    props: ['min', 'max', 'available', 'initialValue', 'color'],

    data() {
        return {
            value: this.initialValue
        };
    },

    watch: {
        initialValue() {
            this.value = this.initialValue;
        }
    },

    computed: {
        width() {
            return `${ this.value / this.max * 100 }%`;
        }
    },

    methods: {
        move(event) {
            let percent = event.layerX / this.$refs.container.offsetWidth;
            if (percent > 1) {
                percent = 1;
            }
            const value = Math.floor(Math.round(this.max) * (percent));

            this.$emit('change', value);
        }
    }
}
</script>

<style lang="less" scoped>
    .gauge-selector {
        padding: 5px 0px;

        & > header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.9em;
            padding: 2px 0px;
        }

        & > section {
            width: 100%;
            height: 15px;
            border-width: 2px;
            border-style: solid;
            border-radius: 10px;
            overflow:hidden;
            cursor: pointer;

            & > div {
                min-width: 20px;
                border-radius: 10px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;

                & > div {
                    cursor: move;
                    min-width: 8px;
                    min-height: 8px;
                    background-color: black;
                    border-style: solid;
                    border-width: 5px;
                    border-radius: 50%;
                }
            }
        }
    }
</style>
