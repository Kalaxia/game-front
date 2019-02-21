<template>
    <div>
        <faction-data id="faction-data" v-if="faction" :faction="faction" />
        <faction-members id="faction-members" v-if="faction" :faction="faction" />
        <faction-relations id="faction-relations" v-if="faction" :faction="faction" />
    </div>
</template>

<script>
import Faction from '~/model/faction';

import FactionData from '~/components/organisms/faction/faction';
import FactionMembers from '~/components/molecules/faction/members';
import FactionRelations from '~/components/molecules/faction/relations';

export default {
    name: 'page-my-faction',

    data() {
        return {
            faction: null
        };
    },

    components: {
        FactionData,
        FactionMembers,
        FactionRelations,
    },

    async mounted() {
        if (this.currentPlayer !== null) {
            this.faction = await this.$repositories.faction.getFaction(this.currentPlayer.faction.id);
        }
    },

    computed: {
        currentPlayer() {
            return this.$store.state.user.player;
        }
    },

    watch: {
        async currentPlayer(player) {
            this.faction = await this.$repositories.faction.getFaction(this.currentPlayer.faction.id);
        }
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
        overflow-y: scroll;
    }

    #faction-relations {
        grid-row: ~"6/10";
        grid-column: ~"2/6";
        display: flex;
    }
</style>