<template>
    <div>
        <div id="registration">
            <factions-choice />
        </div>
    </div>
</template>

<script>
import FactionsChoice from '../organisms/registration/factions-choice';

export default {
    name: 'registration',

    components: {
        FactionsChoice
    }
}
</script>

<style lang="less" scoped>
    #registration {
        grid-column: ~"3/9";
        grid-row: ~"3/9";
    }
</style>
