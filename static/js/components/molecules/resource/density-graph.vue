<template>
    <div id="resource-production">
        <header>
            <h3>{{ $t('planet.production') }}</h3>
        </header>
        <section>
            <canvas id="resource-density"></canvas>
            <div class="density-picto"
                v-for="(resource, index) in resources"
                :key="resource.name"
                :style="{ bottom: getPictoBottom(index), right: getPictoRight(index) }">
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

    props: ['resources'],

    components: {
        ResourceItem
    },

    mounted: function() {
        const ctx = document.getElementById('resource-density');

        ctx.style.height = '500px';
        ctx.style.width = '500px';

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

    methods: {
        getPictoAngle: function(index) {
            return (( Math.PI ) * ( -index/3 - 1/6 ));
        },

        getPictoBottom: function(index) {
            /**
             * 250: canvas height / 2
             * 10: border size
             * 32: picto size / 2
             */
            return 250 - 10 - 32 + (Math.cos(this.getPictoAngle(index)) * 250) + 'px';
        },

        getPictoRight: function(index) {
            /**
             * 250: canvas height / 2
             * 10: border size
             * 32: picto size / 2
             */
            return 250 - 10 - 32 + (Math.sin(this.getPictoAngle(index)) * 250) + 'px';
        },

        getDensityDatasets: function() {
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

    #resource-production > section {
        position: relative;
        background-color: #090A0A;
        border-radius: 250px;
        width: 500px;
        height: 500px;
    }

    .density-picto {
        position: absolute;
        background-color: #1E2024;
        border: 10px solid #090A0A;
        border-radius: 100%;
    }
</style>
