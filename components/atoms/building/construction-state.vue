<template>
    <div class="construction-state">
        <div>
            <span>{{ building.construction_state.current_points }}</span>
            <colored-picto src="Pc_GenieMilitaire.png" color="white" :width="pictoSize" :height="pictoSize"/>
        </div>
        <gauge :levels="constructionLevel" background="#2D2D2D" :style="{ height: gaugeHeight }" />
        <div>
            <span>{{ building.construction_state.points }}</span>
            <colored-picto src="Pc_GenieMilitaire.png" color="white" :width="pictoSize" :height="pictoSize"/>
        </div>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import Gauge from '~/components/atoms/gauge';

export default {
    name: 'building-construction-state',

    props: ['building', 'pictoSize', 'gaugeHeight'],

    components: {
        ColoredPicto,
        Gauge
    },

    computed: {
        constructionLevel() {
            return [{
                color: this.$store.getters('user/factionsColors')['main'],
                value: Math.floor(this.building.construction_state.current_points / this.building.construction_state.points * 100)
            }];
        }
    }
}
</script>

<style lang="less" scoped>
    .construction-state {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;

        & > div:not(.gauge) {
            display: flex;
            align-items: center;

            & > span {
                padding-right: 2px;
            }
        }

        & > .gauge {
            flex-grow: 1;
            margin-left: 5px;
            margin-right: 5px;
        }
    }
</style>
