<template>
    <div ref="alert" class="alert" :style="{ backgroundColor: factionColors['black'], color: factionColors['white'] }">
        <header>
            <h4>{{ $t(`alerts.${alert.message}.title`, data) }}</h4>
        </header>
        <section>
            <div v-html="$t(`alerts.${alert.message}.content`, data)"></div>
        </section>
        <footer v-html="$t(`alerts.${alert.message}.footer`, data)"></footer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatData } from '~/lib/notifications';

export default {
    name: 'user-alert',
    
    props: ['alert'],

    data() {
        return {
            timer: null
        };
    },

    mounted() {
        for (const link of this.$refs.alert.querySelectorAll('.link')) {
            link.onclick = () => {
                this.$router.push(link.getAttribute('data-link'));
                clearTimeout(this.timer);
                this.$store.commit('user/removeAlert', this.alert);
            };
        }
        for (const element of this.$refs.alert.querySelectorAll('.translate')) {
            element.innerHTML = this.$i18n.t(element.innerText);
        }
        this.timer = setTimeout(() => {
            this.$emit('user/removeAlert', this.alert);
        }, 60000);
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        data() {
            return formatData(this.alert.data);
        }
    }
}
</script>

<style lang="less" scoped>
    .alert {
        text-align: center;
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 1.1em;
    }
</style>