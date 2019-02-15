<template>
    <div :id="`planet-${planet.id}-relations`" class="planet-relations">
        <canvas :width="width" :height="height"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';
import { shadeColor } from '../../../lib/colors';

export default {
    name: 'planet-relations',
    
    props: ['planet', 'width', 'height'],

    data() {
        return {
            indicators: this.$i18n.t('diplomacy.relations.indicators')
        };
    },

    mounted() {
        const context = document.querySelector(`#planet-${this.planet.id}-relations > canvas`).getContext('2d');

        context.translate(0.5, 0.5);
        context.imageSmoothingEnabled = false;

        const chart = new Chart(context, {
            type: 'doughnut',
            data: this.getRelationDatasets(this.planet.relations),
            options: {
                responsive: false,
                legend: {
                    display: false,
                },
                tooltips: {
                    filter: (item, data) => (typeof data.datasets[item.datasetIndex].labels[item.index] !== "undefined"),
                    callbacks: {
                        label: (tooltipItem, data) => {
                            const dataset = data.datasets[tooltipItem.datasetIndex];
                            const index = tooltipItem.index;
                            return dataset.labels[index] + ': ' + this.getRelationshipIndicator(dataset.data[index], dataset.scoreType[index]);
                        }
                    }
                }
            }
        });
    },

    methods: {
        getRelationDatasets(relations) {
            const factionDataset = { data: [], labels: [], scoreType: [], backgroundColor: [] };
            const playerDataset = { data: [], labels: [], scoreType: [], backgroundColor: [] };
            const labels = [];

            for (const relation of relations) {
                let dataset, color, name = null;
                if (relation.faction !== null) {
                    dataset = factionDataset;
                    color = relation.faction.color;
                    name = relation.faction.name;
                } else {
                    dataset = playerDataset;
                    color = relation.player.faction.color;
                    name = relation.player.pseudo;
                }
                dataset.data.push(Math.abs(relation.score));
                if (relation.score > 0) {
                    dataset.backgroundColor.push(color);
                    dataset.scoreType.push(true);
                } else {
                    dataset.backgroundColor.push(shadeColor(color, -0.2));
                    dataset.scoreType.push(false);
                }
                dataset.labels.push(name);
            }
            // Fill the chart
            factionDataset.data.push(
                (factionDataset.data.length > 0)
                ? (500 * (factionDataset.data.length - 1)) + 500
                : 500
            );
            factionDataset.backgroundColor.push("#242424");
            playerDataset.data.push(
                (playerDataset.data.length > 0)
                ? (100 * (playerDataset.data.length - 1)) + 500
                : 500
            );
            playerDataset.backgroundColor.push("#242424");

            return {
                datasets: [playerDataset, factionDataset],
                labels: labels
            };
        },

        getRelationshipIndicator(score, isPositive) {
            if (isPositive === false) {
                score *= -1;
            }
            const indicators = this.indicators;
            switch (true) {
                case score >= 500: return indicators.philanthropic;
                case score >= 400: return indicators.excellent;
                case score >= 300: return indicators.friendly;
                case score >= 200: return indicators.good;
                case score >= 100: return indicators.cordial;
                case score >= 0: return indicators.neutral;
                case score >= -100: return indicators.cold;
                case score >= -200: return indicators.hostile;
                case score >= -300: return indicators.odious;
                case score >= -400: return indicators.infamous;
            }
        }
    }
}
</script>