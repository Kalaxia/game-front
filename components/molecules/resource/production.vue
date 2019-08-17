<template>
    <div :class="['resource-production', {bonus: bonus > 0}]">
        <resource-item :resource="resource" />
        <span>
            {{ production }} (<template v-if="bonus > 0">+</template>{{ bonus }} %)
        </span>
    </div>
</template>

<script>
import ResourceItem from '~/components/atoms/resource/item';
import { mapGetters } from 'vuex';

export default {
    name: 'resource-production',

    props: ['building', 'resource'],

    components: {
        ResourceItem
    },

    computed: {
        ...mapGetters({
            currentPlanet: 'user/currentPlanet'
        }),

        planetProduction() {
            return this.currentPlanet.resources.filter(r => r.name === this.resource.name).shift().density * 10;
        },

        production() {
            const modified = Math.floor(this.planetProduction * Math.abs(this.bonus) / 100);

            return this.planetProduction + (this.bonus > 0 ? modified : -modified);
        },

        bonus() {
            return this.building.compartments.reduce((acc, c) => {
                const plan = this.$resources.buildings[this.building.name].compartments.filter(c =>[c.name]).shift();
                const modifierFilter = m => m.type === 'resource' && m.resource === this.resource.name
                const bonus = plan.bonuses.filter(modifierFilter);
                const malus = plan.maluses.filter(modifierFilter);

                return acc + (bonus.length > 0 ? bonus.shift().percent : 0) - (malus.length > 0 ? malus.shift().percent : 0); 
            }, 0);
        }
    }
}
</script>

<style lang="less" scoped>
@import '~less/variables.less';

.resource-production {
    display: flex;
    align-items: center;
    color: @checkRed;

    &.bonus {
        color: @checkGreen;
    }

    & > .resource-item {
        width: 36px;
        height: 36px;
        margin-right: 10px;
    }
}
</style>