<template>
    <div class="faction-members">
        <header>
            <h3>{{ $t('faction.members.title') }}</h3>
        </header>
        <section>
            <member v-for="member in members" :member="member" :key="member.id" />
        </section>
    </div>
</template>

<script>
import Player from '~/model/player';

import Member from '~/components/atoms/faction/member';

export default {
    name: 'faction-members',

    props: ['faction', 'members'],

    components: {
        Member
    },
}
</script>

<style lang="less" scoped>
    .faction-members {
        & > section {
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>
