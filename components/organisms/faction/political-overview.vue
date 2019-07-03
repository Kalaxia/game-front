<template>
    <div class="political-overview">
        <header>
            <h3>Motions en cours</h3>
        </header>
        <section>
            <nuxt-link :to="`/faction/${faction.id}/motions/new`">
                Créer une nouvelle motion
            </nuxt-link>
        </section>
    </div>
</template>

<script>
export default {
    name: 'faction-political-overview',

    props: ['faction', 'motions']
}
</script>

<style lang="less" scoped>
    .political-overview {

    }
</style>
