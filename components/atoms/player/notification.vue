<template>
    <div ref="notification" class="notification" v-html="$t(notification.content, data)"></div>
</template>

<script>
import { formatData } from '~/lib/notifications';

export default {
    name: 'notification',

    props: ['notification'],

    mounted() {
        for (const link of this.$refs.notification.querySelectorAll('.link')) {
            link.onclick = () => { this.$router.push(link.getAttribute('data-link')); };
        }
        for (const element of this.$refs.notification.querySelectorAll('.translate')) {
            element.innerHTML = this.$i18n.t(element.innerText);
        }
    },
    
    computed: {
        data () {
            return formatData(this.notification.data);
        }
    }
}
</script>

<style lang="less" scoped>
    .notification {
        margin: 10px 0px;
        padding-bottom: 10px;

        .link {
            cursor: pointer;
            font-weight: bold;
        }
    }
</style>
