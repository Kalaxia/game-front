<template>
    <div>
        <faction-data :faction="otherFaction" />
        <div id="casus-belli">
            <h3>Casus Belli</h3>
            <section>
                <casus-belli v-for="cb in casusBelli" :key="cb.id" :faction="otherFaction" :casusBelli="cb" />
            </section>
        </div>
        <div id="wars">
            <h3>Guerres</h3>
            <section>
                <war-card v-for="w in wars" :key="w.id" :faction="faction" :otherFaction="otherFaction" :war="w" />
            </section>
        </div>
    </div>
</template>

<script>
import CasusBelli from '~/components/molecules/faction/relation/casus-belli';
import FactionBanner from '~/components/atoms/faction/banner';
import FactionData from '~/components/organisms/faction/faction';
import WarCard from '~/components/molecules/faction/relation/war-card';

export default {
    name: 'page-faction-relation',

    components: {
        CasusBelli,
        FactionBanner,
        FactionData,
        WarCard
    },

    async asyncData({ app, params }) {
        const [ faction, otherFaction, wars, casusBelli ] = await Promise.all([
            app.$repositories.faction.faction.getFaction(params.id),
            app.$repositories.faction.faction.getFaction(params.relation_id),
            app.$repositories.faction.war.getWars(params.id),
            app.$repositories.faction.war.getUnansweredCasusBelli(params.id, params.relation_id)
        ]);

        return { faction, otherFaction, wars, casusBelli };
    }    
}
</script>

<style lang="less">
.faction-data {
    grid-column: ~"2/6";
    grid-row: ~"3/5";
}

#casus-belli {
    grid-column: ~"7/10";
    grid-row: ~"3/9";
    overflow-y: auto;

    & > section {
        display: flex;
        flex-direction: column;

        & > .casus-belli {
            border-top: 1px solid grey;

            &:first-child {
                border-top: none;
            }
        }
    }
}

#wars {
    grid-column: ~"2/6";
    grid-row: ~"5/9";

    & > section {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>