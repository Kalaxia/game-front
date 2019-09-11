<template>
    <nuxt-link class="fleet-card" :to="`/fleets/${fleet.id}`" :style="{ borderColor: factionColors['grey'], color: factionColors['white'] }">
        <header>
            {{ $t('fleet.title', {fleet: fleet.id}) }}
        </header>
        <section v-if="fleet.journey" class="journey">
            <journey-step :step="fleet.journey.currentStep" />
        </section>
        <section v-else-if="fleet.location">
            <planet-image :type="fleet.location.type" width="48" height="48" />
            <p>{{ $t('fleet.statuses.idle', { location: fleet.location.name }) }}</p>
        </section>
    </nuxt-link>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import PlanetImage from '~/components/atoms/planet/image';
import JourneyStep from '~/components/molecules/fleet/journey-step';
import { mapGetters } from 'vuex';

export default {
    name: 'fleet-card',

    props: ['fleet'],

    components: {
        ColoredPicto,
        PlanetImage,
        JourneyStep
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/box.less';

    .fleet-card {
        width: 250px;
        height: 120px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid;
        text-decoration: none;
        margin: 5px;
        display: flex;
        flex-direction: column;

        & > header {
            font-size: 1.2em;
            margin: 5px 0px;
        }

        & > section {
            display: flex;
            flex-grow: 1;
        }
    }

    p {
        margin: 0px;
        padding-left: 10px;
    }
</style>
