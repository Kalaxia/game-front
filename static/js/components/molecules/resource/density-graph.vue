<template>
    <div :id="`resource-${id}-production`" class="resource-density-graph">
        <section :style="{ width: `${size}px`, height: `${size}px` }">
            <canvas></canvas>
            <div class="density-picto"
                v-for="(resource, index) in resources"
                :key="resource.name"
                :style="{ width: `${pictoSize}px`, bottom: getPictoBottom(index), right: getPictoRight(index) }">
                <resource-item :resource="resource" />
            </div>
        </section>
    </div>
</template>

<script>
import Chart from 'chart.js';
import ResourceItem from '../../atoms/resource/item';
import resourcesData from '../../../resources/resources';

export default {
    name: 'resource-density-graph',

    props: ['id', 'resources', 'size'],

    components: {
        ResourceItem
    },

    mounted() {
        const ctx = document.querySelector(`#resource-${this.id}-production > section > canvas`);

        ctx.style.height = `${this.size}px`;
        ctx.style.width = `${this.size}px`;

        const myChart = new Chart(ctx, {
            type: 'polarArea',
            data: this.getDensityDatasets(),
            options: {
                responsive: false,
                legend: {
                    display: false,
                },
                scale: {
                    gridLines: {
                        color: '#090A0A',
                        lineWidth: 1,
                    },
                    ticks: {
                        display: false,
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        stepSize: 25,
                        showLabelBackdrop: false,
                    },
                    tooltips: {
                        enabled: false,
                    },
                    hover: {
                        display: false,
                        mode: null,
                    },
                },
            }
        });
    },

    computed: {
        pictoSize() {
            return Math.floor(this.size * 0.07);
        }
    },

    methods: {
        getPictoAngle(index) {
            return (( Math.PI ) * ( -index / 3 - 1 / 6 ));
        },

        getPictoBottom(index) {
            /**
             * 250: canvas height / 2
             * 10: border size
             * 32: picto size / 2
             */
            return (this.size / 2) - 10 - (this.pictoSize / 2) + (Math.cos(this.getPictoAngle(index)) * (this.size / 2)) + 'px';
        },

        getPictoRight(index) {
            /**
             * 250: canvas height / 2
             * 10: border size
             * 32: picto size / 2
             */
            return (this.size / 2) - 10 - (this.pictoSize / 2) + (Math.sin(this.getPictoAngle(index)) * (this.size / 2)) + 'px';
        },

        getDensityDatasets() {
            const dataset = { data: [], backgroundColor: [], borderColor: [], borderWidth: 20 };
            let added = 0;
            const numberOfResources = 6;
            for (const key in this.resources) {
                const resource = Object.assign({}, this.resources[key], resourcesData[this.resources[key].name]);

                dataset.data.push(resource.density);
                dataset.backgroundColor.push(resource.color);
                dataset.borderColor.push('#090A0A');
                added++;
            }
            while (added < numberOfResources) {
                dataset.data.push(0);
                dataset.backgroundColor.push('red');
                dataset.borderColor.push('#E12024');
                added++;
            }
            return {
                datasets: [ dataset ],
            };
        }
    }
}
</script>

<style lang="less" scoped>
    h3 {
        margin-top: 0px;
    }

    .resource-density-graph > section {
        position: relative;
        background-color: #090A0A;
        border-radius: 50%;
    }

    .density-picto {
        position: absolute;
        background-color: #1E2024;
        border: 10% solid #090A0A;
        border-radius: 100%;

        & > img {
            width: 100%;
        }
    }
</style>
