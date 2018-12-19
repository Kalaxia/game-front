<template>
    <div>
        <header>
            <h3>{{ $t('faction.members.title') }}</h3>
        </header>
        <section>
            <member v-for="member in members" :member="member" :key="member.id" />
        </section>
    </div>
</template>

<script>
import Api from '../../../core/api';
import Player from '../../../model/player';

import Member from '../../atoms/faction/member';

export default {
    name: 'faction-members',

    props: ['faction'],

    components: {
        Member
    },

    data: function () {
        return {
            members: []
        };
    },

    mounted: function () {
        this.loadMembers();
    },

    methods: {
        loadMembers: function() {
            return fetch(`/api/factions/${this.faction.id}/members`, {
                method: 'GET',
                headers: Api.headers
            })
            .then(Api.responseMiddleware)
            .then(members => {
                this.members = new Array();
                for (const member of members) {
                    this.members.push(new Player(member));
                }
            });
        }
    }
}
</script>

<style lang="less" scoped>

</style>
