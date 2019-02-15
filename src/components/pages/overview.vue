<template>
    <div>
        <planet-list :planets="planets" />
    </div>
</template>

<script>
import PlanetList from 'components/organisms/planet/list';

export default {
    name: 'page-overview',

    components: {
        PlanetList,
    },

    computed: {
        planets() {
            return this.$store.state.user.planets;
        }
    }
};
</script>