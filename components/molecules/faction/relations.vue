<template>
    <div id="faction-relations">
        <div v-for="relation in faction.relations" :key="relation.id" :id="`relation-${relation.faction.id}`" class="faction">
            <header>
                <h4 :style="{color: relation.faction.color}">{{ relation.faction.name }}</h4>
                <router-link :to="`/faction/${relation.faction.id}`">
                    <faction-banner :faction="relation.faction" width="80" height="130" />
                </router-link>
            </header>
            <section>
                <p>{{ $t(`diplomacy.relations.indicators.${relation.state}`) }}</p>
            </section>
        </div>
    </div>
</template>

<script>
import FactionBanner from '~/components/atoms/faction/banner';

export default {
    name: 'faction-relations',

    props: ['faction'],

    components: {
        FactionBanner
    }
}
</script>

<style lang="less" scoped>
    .faction {
        text-align: center;
        margin: 5px 10px;
    }

    .faction-banner {
        margin: auto;
    }
</style>