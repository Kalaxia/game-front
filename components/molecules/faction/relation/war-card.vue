<template>
    <div class="faction-war-card" :style="{borderColor: war.ended_at ? faction.colors['grey'] : otherFaction.colors['main'] }">
        <header>
            
        </header>
        <section>
            <colored-picto src="Combat.svg" :width="32" :height="32" :color="faction.colors['white']" />
        </section>
        <footer>
            <div v-if="war.ended_at">
                <span>{{ (new Date(war.ended_at)).toLocaleDateString() }}</span>
            </div>
            <div v-else>
                Conflit toujours en cours
            </div>
        </footer>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';

export default {
    name: 'faction-war-card',

    props: ['war', 'faction', 'otherFaction'],

    components: {
        ColoredPicto
    }
}
</script>

<style lang="less">
.faction-war-card {
    margin: 5px;
    padding: 10px 20px;
    border: 2px solid;
    border-radius: 10px;
}
</style>