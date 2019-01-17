<template>
    <div>
        <faction-data id="faction-data" v-if="faction" :faction="faction" />
        <faction-members id="faction-members" v-if="faction" :faction="faction" />
        <faction-relations id="faction-relations" v-if="faction" :faction="faction" />
    </div>
</template>

<script>
import { getFaction, getFactionMembers } from '../../../api/faction';

import Faction from '../../../model/faction';

import FactionData from '../../organisms/faction/faction';
import FactionMembers from '../../molecules/faction/members';
import FactionRelations from '../../molecules/faction/relations';

export default {
    name: 'page-faction',

    data: function() {
        return {
            faction: null
        };
    },

    components: {
        FactionData,
        FactionMembers,
        FactionRelations,
    },

    mounted: async function() {
        this.faction = await getFaction(this.$route.params.id);
    },

    beforeRouteUpdate: async function(to, from, next) {
        this.faction = await getFaction(to.params.id);
        await getFactionMembers(this.faction);

        next();
    }
}
</script>

<style lang="less" scoped>
    #faction-data {
        grid-row: ~"3/6";
        grid-column: ~"2/6";
    }

    #faction-members {
        grid-row: ~"3/10";
        grid-column: ~"6/10";
        overflow: scroll;
    }

    #faction-relations {
        grid-row: ~"6/10";
        grid-column: ~"2/6";
        display: flex;
    }
</style>