<template>
    <polygon class="territory" :points="coordinates" :style="style" />
</template>

<script>
export default {
    name: 'map-territory',

    props: ['territory'],

    computed: {
        coordinates() {
            return this.convexHull.map(c => `${Math.floor(c.x * this.$store.state.map.scale)},${Math.floor(c.y * this.$store.state.map.scale)}`).join(' ');
        },

        style() {
            return {
                fill: this.territory.planet.player.faction.colors['mainLight'],
            };
        },

        convexHull() {
            this.territory.coordinates.sort((a, b) => a.x != b.x ? a.x - b.x : a.y - b.y);

            const n = this.territory.coordinates.length;
            const hull = [];

            for (let i = 0; i < 2 * n; i++) {
                let j = i < n ? i : 2 * n - 1 - i;
                while (hull.length >= 2 && this.removeMiddle(hull[hull.length - 2], hull[hull.length - 1], this.territory.coordinates[j])) {
                    hull.pop();
                }
                hull.push(this.territory.coordinates[j]);
            }
            hull.pop();
            return hull;
        },
    },

    methods: {
        removeMiddle(a, b, c) {
            var cross = (a.x - b.x) * (c.y - b.y) - (a.y - b.y) * (c.x - b.x);
            var dot = (a.x - b.x) * (c.x - b.x) + (a.y - b.y) * (c.y - b.y);
            return cross < 0 || cross == 0 && dot <= 0;
        }
    }
}
</script>

<style lang="less" scoped>
    .territory{
        fill-opacity: 0.4;
        stroke: white;
        stroke-width: 3px;
    }
</style>