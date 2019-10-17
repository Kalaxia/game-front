<template>
    <div id="hangar-details" :style="{ borderColor: factionColors['grey'], backgroundColor: factionColors['black'] }">
        <header>
            <h3>
                {{ $t('planet.hangar', { planet: currentPlanet.name }) }}
            </h3>
        </header>
        <section>
            <hangar-group v-for="g in groups" :key="g.id" :group="g" :isSelected="selectedGroup === g" @click.native="$emit('selectGroup', g)" />
        </section>
    </div>
</template>

<script>
import HangarGroup from '~/components/molecules/planet/hangar-group';
import { mapGetters } from 'vuex';

export default {
    name: 'hangar-details',

    props: ['groups', 'selectedGroup'],

    components: {
        HangarGroup
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors',
            currentPlanet: 'user/currentPlanet'
        })
    }
}
</script>

<style lang="less" scoped>
    #hangar-details {
        border: 2px solid;
        border-radius: 10px;
        padding: 10px 20px;

        & > section {
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>