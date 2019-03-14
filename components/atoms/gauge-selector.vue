<template>
    <div class="gauge-selector">
        <header>
            <span>{{ min }}</span>
            <span>{{ max }}</span>
        </header>
        <section :style="{ borderColor: color }" ref="container">
            <div :style="{ width: width, backgroundColor: color }" ref="gauge">
                <div  draggable="true" @dragstart="drag" :style="{ borderColor: color }">

                </div>
            </div>
        </section>
    </div>
</template>

<script>
const dragData = {
    start: null,
    gaugeWidth: null
};

export default {
    name: 'gauge-selector',

    props: ['min', 'max', 'available', 'initialValue', 'color'],

    data() {
        return {
            value: this.initialValue
        };
    },

    computed: {
        width() {
            return `${ this.value / this.max * 100 }%`;
        }
    },

    methods: {
        drag(event) {
            dragData.start = event.clientX;
            dragData.gaugeWidth = this.$refs.gauge.offsetWidth;

            document.onmousemove = this.move;
            document.onmouseup = this.stop;
        },

        move(event) {
            const width = event.clientX - dragData.start + dragData.gaugeWidth;

            const newValue = Math.floor(this.max * width / this.$refs.container.offsetWidth);

            if (newValue < this.min || newValue > this.max || (this.available !== null && newValue > this.value && this.available === 0)) {
                return;
            }

            this.value = newValue;

            this.$emit('change', newValue);
        },

        stop(event) {
            dragData.start = null;
            dragData.gaugeWidth = null;

            document.onmousemove = null;
            document.onmouseup = null;

            this.$emit('stop', this.value);
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
